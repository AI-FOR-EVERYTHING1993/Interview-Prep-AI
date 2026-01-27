import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { BedrockService } from "./bedrock";

export interface AIService {
  generateInterviewQuestions(params: {
    role: string;
    level: string;
    techstack: string[];
    amount: number;
  }): Promise<string[]>;
}

class GoogleGeminiService implements AIService {
  async generateInterviewQuestions(params: {
    role: string;
    level: string;
    techstack: string[];
    amount: number;
  }): Promise<string[]> {
    const { text } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt: `Prepare questions for the job interview.
      The job role is ${params.role}. The experience level is ${params.level}.
      The tech stack is ${params.techstack.join(', ')}.
      Generate ${params.amount} questions.
      Format the output as a JSON array of strings.`,
      maxCompletionTokens: 1000,
    });
    
    return JSON.parse(text);
  }
}

class AWSBedrockService implements AIService {
  private bedrock = new BedrockService();

  async generateInterviewQuestions(params: {
    role: string;
    level: string;
    techstack: string[];
    amount: number;
  }): Promise<string[]> {
    const prompt = `Prepare questions for the job interview.
    The job role is ${params.role}. The experience level is ${params.level}.
    The tech stack is ${params.techstack.join(', ')}.
    Generate ${params.amount} questions.
    Format the output as a JSON array of strings.`;
    
    const text = await this.bedrock.generateText(prompt);
    return JSON.parse(text);
  }
}

function createAIService(): AIService {
  const useAWS = process.env.USE_AWS_AI === 'true';
  return useAWS ? new AWSBedrockService() : new GoogleGeminiService();
}

export const aiService = createAIService();