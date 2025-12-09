import { NextRequest, NextResponse } from 'next/server';

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
  // Using gemini-1.5-flash for higher quota and stability
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
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
    return NextResponse.json({ 
      error: error.message || 'Failed to get response' 
    }, { status: 500 });
  }
}

