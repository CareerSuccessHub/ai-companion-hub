import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      return NextResponse.json({ error: 'No API key configured' }, { status: 500 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }
    
    // Filter only models that support generateContent
    const availableModels = data.models?.filter((model: any) => 
      model.supportedGenerationMethods?.includes('generateContent')
    ).map((model: any) => model.name);
    
    return NextResponse.json({ 
      availableModels,
      allModels: data.models?.map((m: any) => ({ 
        name: m.name, 
        methods: m.supportedGenerationMethods 
      }))
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
