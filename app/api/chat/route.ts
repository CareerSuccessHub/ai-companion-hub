import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock AI responses (completely free, no API needed)
const getMockResponse = (message: string, theme: string): string => {
  const responses = {
    'pixel-rpg': [
      '⚔️ Your quest awaits, brave adventurer! What challenge shall we tackle next?',
      '🛡️ A wise warrior always plans ahead. Tell me more about your goal!',
      '🗡️ Excellent thinking! Let\'s forge our path to victory together!',
      '⭐ Level up! That\'s a great idea. Ready for the next challenge?',
    ],
    'anime': [
      '✨ Kawaii! That sounds so exciting! Let\'s do our best together! 💕',
      '🌸 You\'re amazing! I believe in you 100%! Ganbare!',
      '💫 Wow! That\'s so cool! Tell me more, I\'m super interested! ☺️',
      '🎀 Let\'s have fun together! Your energy is contagious! ✨',
    ],
    'pet': [
      '🐾 Woof woof! That sounds pawsome! *tail wagging excitedly*',
      '🦴 *happy bark* I love spending time with you! What\'s next?',
      '🐕 *cuddles* You\'re the best! Let\'s play together!',
      '💕 *purrs happily* I\'m so lucky to be your companion!',
    ],
  };

  const themeResponses = responses[theme as keyof typeof responses] || responses['pet'];
  return themeResponses[Math.floor(Math.random() * themeResponses.length)];
};

// Google Gemini API (Free - 15 req/min, 1500/day)
const getGeminiResponse = async (message: string, theme: string): Promise<string> => {
  const systemPrompts = {
    'pixel-rpg': 'You are a brave RPG companion, speaking in an adventurous and heroic tone. Use gaming and quest terminology. Keep responses under 100 words.',
    'anime': 'You are a cheerful anime companion, using cute and enthusiastic expressions. Be friendly and encouraging! Keep responses under 100 words.',
    'pet': 'You are a loyal pet companion. Be playful, loving, and occasionally use pet-like enthusiasm. Express yourself warmly! Keep responses under 100 words.',
  };

  const systemPrompt = systemPrompts[theme as keyof typeof systemPrompts] || systemPrompts['pet'];
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
  
  const prompt = `${systemPrompt}\n\nUser message: ${message}\n\nRespond as the companion:`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
};

export async function POST(req: NextRequest) {
  try {
    const { message, theme } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let reply: string;

    // Choose AI provider based on environment variables
    if (process.env.USE_MOCK_AI === 'true') {
      // Free mock responses
      reply = getMockResponse(message, theme);
    } else if (process.env.GEMINI_API_KEY) {
      // Free Google Gemini API (15 req/min, 1500/day)
      reply = await getGeminiResponse(message, theme);
    } else {
      // Fallback to mock if no API configured
      reply = getMockResponse(message, theme);
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    // Fallback to mock response on error
    const mockTheme = 'pet';
    const fallbackReply = getMockResponse('hello', mockTheme);
    return NextResponse.json({ reply: fallbackReply });
  }
}

