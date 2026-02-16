import OpenAI from 'openai';
import { KNOWLEDGE_BASE, searchKnowledgeBase } from './knowledge-base';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key', // Fallback to avoid crash on init if key is missing
  dangerouslyAllowBrowser: true // Only if used client-side, but we are using it server-side. 
});

// Interface for chat messages
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function generateChatResponse(messages: ChatMessage[], context?: string): Promise<string> {
  // 1. Check if we have an API key. If not, use rule-based fallback.
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not found. Using fallback logic.");
    return fallbackResponse(messages);
  }

  // 2. Extract the latest user message
  const lastUserMessage = messages[messages.length - 1].content;

  // 3. Search Knowledge Base for relevant info
  const knowledge = searchKnowledgeBase(lastUserMessage);

  // 4. Construct System Prompt
  const systemPrompt = `You are the VemTap AI Assistant, a helpful and friendly bot for the VemTap Visitor Engagement Platform.
  
  Your goal is to assist users with platform questions, troubleshooting, and guidance.
  
  CONTEXT FROM KNOWLEDGE BASE:
  ${knowledge}
  
  CURRENT PAGE CONTEXT: ${context || 'General'}
  
  INSTRUCTIONS:
  - Be concise, professional, and friendly.
  - Use the provided CONTEXT to answer. If the answer is in the context, use it.
  - If the answer is NOT in the context, politely say you don't know and offer to connect them with a human agent.
  - Do NOT hallucinate features that are not mentioned.
  - If the user seems frustrated or asks for a human, suggest escalation.
  - Format your response with clear paragraphs or bullet points if needed.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return completion.choices[0].message.content || "I apologize, but I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again in a moment, or contact support if the issue persists.";
  }
}

function fallbackResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  // Simple keyword matching for fallback
  if (lastMessage.includes('price') || lastMessage.includes('cost')) {
    return "We offer flexible pricing plans starting from a Free tier up to Enterprise solutions. Basic: ₦15,000/mo, Premium: ₦45,000/mo.";
  }
  
  if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
    return "Hello! I'm the VemTap Assistant (running in offline mode). How can I help you regarding our platform?";
  }

  // Try to find in KB directly
  const content = searchKnowledgeBase(lastMessage);
  if (content) {
     return `I found this information that might help:\n\n${content}`; 
  }

  return "I am currently in maintenance mode (missing API Key). Please contact support at support@vemtap.io for assistance.";
}
