import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    const { jobTitle, currentOffer, experience, location } = await request.json();

    if (!jobTitle || !currentOffer) {
      return NextResponse.json(
        { error: "Job title and current offer are required" },
        { status: 400 }
      );
    }

    const prompt = `You are an expert salary negotiation coach. Create a professional, confident, and collaborative negotiation script for the following situation:

JOB TITLE: ${jobTitle}
CURRENT OFFER: ${currentOffer}
EXPERIENCE: ${experience}
LOCATION: ${location}

Please provide:
1. Opening statement (enthusiastic but sets expectation for negotiation)
2. Market research reference (mention industry standards)
3. Value proposition (why you're worth more)
4. Specific ask (10-20% above current offer based on market)
5. Collaborative closing (excited to join, but want fair compensation)

Format the response as a natural conversation script with clear sections. Make it sound confident but not aggressive. Include specific dollar amounts for the ask.

Example structure:
"Hi [Hiring Manager], thank you so much for the offer..."

Generate the complete script now:`;

    const API_KEY = process.env.GEMINI_API_KEY!;

    // Try each model in fallback order
    let lastError: any;
    for (const model of GEMINI_MODELS) {
      try {
        console.log(`Attempting to generate script with ${model}...`);
        const scriptText = await callGeminiModel(model, prompt, API_KEY);
        
        if (scriptText) {
          console.log(`✓ Successfully generated script using ${model}`);
          return NextResponse.json({ script: scriptText });
        }
      } catch (error: any) {
        console.error(`✗ ${model} failed:`, error?.error?.message || error.message);
        lastError = error;
        // Continue to next model
      }
    }

    // All models failed
    throw lastError || new Error("All models failed to generate script");
  } catch (error) {
    console.error("Salary negotiation API error:", error);
    
    // User-friendly error message for 503 overload
    const errorMessage = error instanceof Error && error.message.includes('503')
      ? "The AI service is experiencing high traffic. Please try again in a moment."
      : "Failed to generate negotiation script";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
