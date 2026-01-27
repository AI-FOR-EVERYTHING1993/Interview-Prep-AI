import { BedrockService } from "@/lib/ai/bedrock";
import { databaseService } from "@/lib/database";

interface ConversationContext {
  interviewId: string;
  role: string;
  level: string;
  techstack: string[];
  phase: 'welcome' | 'warmup' | 'technical' | 'behavioral' | 'wrapup';
  questionCount: number;
  responses: Array<{question: string, answer: string, timestamp: string}>;
}

export async function POST(request: Request) {
  try {
    const { message, context, action } = await request.json();
    
    const conversationContext: ConversationContext = context || {
      interviewId: '',
      role: 'Software Engineer',
      level: 'mid',
      techstack: ['JavaScript', 'React'],
      phase: 'welcome',
      questionCount: 0,
      responses: []
    };

    const bedrock = new BedrockService();
    let aiResponse = '';
    let nextPhase = conversationContext.phase;

    switch (action) {
      case 'start_interview':
        aiResponse = await generateWelcomeMessage(bedrock, conversationContext);
        nextPhase = 'warmup';
        break;
        
      case 'continue_conversation':
        aiResponse = await generateNextResponse(bedrock, conversationContext, message);
        nextPhase = determineNextPhase(conversationContext);
        break;
        
      case 'end_interview':
        aiResponse = await generateFeedback(bedrock, conversationContext);
        nextPhase = 'wrapup';
        break;
    }

    return Response.json({
      success: true,
      response: aiResponse,
      context: {
        ...conversationContext,
        phase: nextPhase,
        questionCount: conversationContext.questionCount + 1
      }
    });

  } catch (error) {
    console.error('Voice AI error:', error);
    return Response.json({ 
      error: 'Voice AI failed',
      response: "I'm having technical difficulties. Let's continue with the next question."
    }, { status: 500 });
  }
}

async function generateWelcomeMessage(bedrock: BedrockService, context: ConversationContext): Promise<string> {
  const prompt = `You are a professional AI interviewer. Generate a warm welcome message for a ${context.level} ${context.role} interview. 

Say: "Hello! I'm your AI interviewer for this ${context.role} position. This will be a 20-minute conversation covering technical and behavioral questions. Are you ready to begin?"

Keep it under 30 seconds when spoken.`;

  return await bedrock.generateText(prompt);
}

async function generateNextResponse(bedrock: BedrockService, context: ConversationContext, userMessage: string): Promise<string> {
  const phasePrompts = {
    warmup: `Generate a follow-up for warmup phase. User said: "${userMessage}". Ask about their experience with ${context.techstack.join(' or ')}.`,
    technical: `Generate technical question for ${context.level} ${context.role}. Focus on ${context.techstack.join(', ')}. Previous: "${userMessage}"`,
    behavioral: `Generate behavioral question for ${context.role}. Ask for specific examples. Previous: "${userMessage}"`
  };

  const prompt = phasePrompts[context.phase as keyof typeof phasePrompts] || phasePrompts.technical;
  return await bedrock.generateText(prompt);
}

async function generateFeedback(bedrock: BedrockService, context: ConversationContext): Promise<string> {
  const prompt = `Generate brief interview feedback for ${context.level} ${context.role}. Include 2 strengths and 1 improvement area. Keep under 60 seconds.`;
  return await bedrock.generateText(prompt);
}

function determineNextPhase(context: ConversationContext): ConversationContext['phase'] {
  const { phase, questionCount } = context;
  
  if (phase === 'welcome') return 'warmup';
  if (phase === 'warmup' && questionCount >= 2) return 'technical';
  if (phase === 'technical' && questionCount >= 8) return 'behavioral';
  if (phase === 'behavioral' && questionCount >= 12) return 'wrapup';
  
  return phase;
}