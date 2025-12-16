import { NextRequest, NextResponse } from 'next/server';

// Model strategy: Only use gemini-2.5-flash (other models show limit:0 in quota)
// Quota: 500 requests/day, resets 4 PM Philippine Time
// Shared across chat, resume, salary tools
const GEMINI_MODELS = [
  "gemini-2.5-flash",        // Only enabled model - 500 req/day
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
            maxOutputTokens: 4096,
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
  const prompt = `You are a senior career counselor and ATS (Applicant Tracking System) expert with 15+ years of experience reviewing resumes for Fortune 500 companies. Analyze this resume with extreme attention to detail.

Resume:
${resumeText}

Provide your analysis in this exact format:

STRENGTHS:
[List 4-5 SPECIFIC things this resume does exceptionally well. Be detailed:
- Quote exact phrases or sections that are strong
- Explain WHY each strength works (e.g., "The bullet point 'Increased sales by 47%' is quantified and impact-driven")
- Highlight strong action verbs, quantifiable achievements, or impressive technical skills]

IMPROVEMENTS:
[List 5-7 SPECIFIC areas that need improvement. For each, provide:
- The exact problem (e.g., "Experience section lacks quantifiable metrics")
- WHY it's problematic (e.g., "ATS systems prioritize measurable achievements")
- What section/bullet point needs work
- Missing critical elements (summary, skills section, certifications, etc.)]

RECOMMENDATIONS:
[Provide 6-8 ACTIONABLE, step-by-step recommendations. Each should include:
- What to change/add (be specific: "Add a 'Key Achievements' section after your summary")
- How to implement it (e.g., "Rewrite this bullet: 'Responsible for marketing' → 'Drove 35% increase in lead generation through targeted email campaigns'")
- Industry-specific keywords to add for ATS optimization
- Formatting improvements (fonts, spacing, section order)
- Content enhancements (power verbs: 'spearheaded', 'orchestrated', 'optimized')]

Be brutally honest but encouraging. Think like a recruiter who sees 200+ resumes daily. This resume should stand out and pass ATS scans. Provide SPECIFIC examples and rewrites, not vague advice like 'improve formatting'.`;

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
