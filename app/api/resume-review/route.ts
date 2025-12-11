import { NextRequest, NextResponse } from 'next/server';

// Model fallback strategy: try these in order if one fails
const GEMINI_MODELS = [
  "gemini-2.5-flash",       // Primary: best quality, most features
  "gemini-2.0-flash",       // Fallback 1: stable, good performance
  "gemini-2.5-flash-lite",  // Fallback 2: lighter, more capacity
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
            maxOutputTokens: 2048,
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

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'AI service not configured' 
      }, { status: 500 });
    }

    // Try each model in fallback order
    const API_KEY = process.env.GEMINI_API_KEY!;
    let lastError: any;
    
    for (const model of GEMINI_MODELS) {
      try {
        console.log(`Attempting to analyze resume with ${model}...`);
        const feedback = await analyzeResume(resumeText, model, API_KEY);
        
        if (feedback) {
          console.log(`✓ Successfully analyzed resume using ${model}`);
          return NextResponse.json({ feedback });
        }
      } catch (error: any) {
        console.error(`✗ ${model} failed:`, error?.error?.message || error.message);
        lastError = error;
        // Continue to next model
      }
    }

    // All models failed
    throw lastError || new Error("All models failed to analyze resume");
    
  } catch (error: any) {
    console.error('Resume review API error:', error);
    
    // User-friendly error message for 503 overload
    const errorMessage = error?.error?.code === 503 || error.message?.includes('503')
      ? "The AI service is experiencing high traffic. Please try again in a moment."
      : error.message || 'Failed to analyze resume';
    
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 });
  }
}

async function analyzeResume(resumeText: string, model: string, apiKey: string) {
  const prompt = `You are an expert career counselor and resume reviewer. Analyze this resume and provide constructive feedback.

Resume:
${resumeText}

Provide your analysis in this exact format:

STRENGTHS:
[List 3-4 specific things this resume does well - formatting, content, keywords, achievements, etc.]

IMPROVEMENTS:
[List 3-5 specific areas that need improvement - missing sections, weak bullet points, formatting issues, etc.]

RECOMMENDATIONS:
[Provide 4-5 specific, actionable recommendations to improve this resume - exact changes to make, keywords to add, sections to restructure, etc.]

Keep your response professional, encouraging, and specific. Focus on making this resume ATS-friendly and interview-worthy.`;

  const fullResponse = await callGeminiModel(model, prompt, apiKey);

  // Parse the structured response
  const strengthsMatch = fullResponse.match(/STRENGTHS:\s*([\s\S]*?)(?=IMPROVEMENTS:|$)/i);
  const improvementsMatch = fullResponse.match(/IMPROVEMENTS:\s*([\s\S]*?)(?=RECOMMENDATIONS:|$)/i);
  const recommendationsMatch = fullResponse.match(/RECOMMENDATIONS:\s*([\s\S]*?)$/i);

  return {
    strengths: strengthsMatch ? strengthsMatch[1].trim() : "Your resume shows good potential!",
    improvements: improvementsMatch ? improvementsMatch[1].trim() : "Consider refining some sections.",
    recommendations: recommendationsMatch ? recommendationsMatch[1].trim() : "Keep improving and tailoring for each job!",
    raw: fullResponse
  };
}
