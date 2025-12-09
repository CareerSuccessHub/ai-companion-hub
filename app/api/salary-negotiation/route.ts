import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function POST(request: Request) {
  try {
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

Format the response as a natural conversation script with clear sections. Make it sound confident but not aggressive. Include specific dollar amounts for the ask. Keep it under 300 words.

Example structure:
"Hi [Hiring Manager], thank you so much for the offer..."

Generate the complete script now:`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Gemini API request failed");
    }

    const data = await response.json();
    const scriptText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate script. Please try again.";

    return NextResponse.json({ script: scriptText });
  } catch (error) {
    console.error("Salary negotiation API error:", error);
    return NextResponse.json(
      { error: "Failed to generate negotiation script" },
      { status: 500 }
    );
  }
}
