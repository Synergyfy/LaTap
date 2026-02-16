import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse, ChatMessage } from '@/lib/chat-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, context } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const responseText = await generateChatResponse(messages, context);

    return NextResponse.json({ 
        role: 'assistant', 
        content: responseText,
        timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
