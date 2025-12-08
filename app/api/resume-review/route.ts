import { NextRequest, NextResponse } from 'next/server';

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

    // Call Gemini AI for resume analysis
    const feedback = await analyzeResume(resumeText);
    return NextResponse.json({ feedback });
    
  } catch (error: any) {
    console.error('Resume review API error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to analyze resume' 
    }, { status: 500 });
  }
}

async function analyzeResume(resumeText: string) {
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

  const API_KEY = process.env.GEMINI_API_KEY!;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  
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
  const fullResponse = data.candidates[0].content.parts[0].text;

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
