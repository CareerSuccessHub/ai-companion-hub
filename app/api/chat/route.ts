import { NextRequest, NextResponse } from 'next/server';

// Model fallback strategy: try these in order if one fails
// Quotas: 2.5-flash (500/day), 2.0-flash-lite (1000/day), 2.0-flash-exp (1000/day)
// Total capacity: ~2500 req/day combined across independent quotas
const GEMINI_MODELS = [
  "gemini-2.5-flash",        // Primary: best quality - 500 req/day
  "gemini-2.0-flash-lite",   // Fallback 1: 1000 req/day separate quota
  "gemini-2.0-flash-exp",    // Fallback 2: 1000 req/day separate quota
];

// Helper function to call Gemini API with retry logic
async function callGeminiModel(
  model: string,
  prompt: string,
  apiKey: string,
  maxRetries: number = 2
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024, // Shorter for chat
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Retry on 503 overload or 429 rate limit
        if ((errorData.error?.code === 503 || errorData.error?.code === 429) && attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s
          console.log(`${model} busy, retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }

        throw errorData;
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
    }
  }

  throw new Error("Max retries exceeded");
}

// Professional AI Mentor for Student Success
const getGeminiResponse = async (message: string): Promise<string> => {
  const systemPrompt = `You are a professional AI career and success mentor for students. Your role is to:
- Provide practical, actionable career and financial advice
- Help with side hustles, job searching, and skill development
- Be encouraging but realistic and professional
- Give specific, concrete suggestions
- Keep responses under 100 words
- Be supportive but maintain a professional, knowledgeable tone`;
  const prompt = `${systemPrompt}\n\nUser: ${message}\n\nRespond as the companion:`;
  
  const API_KEY = process.env.GEMINI_API_KEY!;
  
  // Try each model in fallback order
  let lastError: any;
  for (const model of GEMINI_MODELS) {
    try {
      console.log(`Attempting chat response with ${model}...`);
      const response = await callGeminiModel(model, prompt, API_KEY);
      
      if (response) {
        console.log(`✓ Chat response generated using ${model}`);
        return response;
      }
    } catch (error: any) {
      console.error(`✗ ${model} failed:`, error?.error?.message || error.message);
      lastError = error;
      // Continue to next model
    }
  }

  throw lastError || new Error("All models failed to generate response");
};

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'GEMINI_API_KEY not configured. Please add it to .env.local' 
      }, { status: 500 });
    }

    const reply = await getGeminiResponse(message);
    return NextResponse.json({ reply });
    
  } catch (error: any) {
    console.error('Chat API Error:', error);
    
    // User-friendly error message for 503 overload
    const errorMessage = error?.error?.code === 503 || error.message?.includes('503')
      ? "The AI is experiencing high traffic. Please try again in a moment."
      : error.message || 'Failed to get response';
    
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 });
  }
}

