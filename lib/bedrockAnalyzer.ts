import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

interface ResumeAnalysisResult {
  suggestedCategory: string;
  suggestedLevel: string;
  extractedSkills: string[];
  recommendations: string[];
  confidence: number;
}

export class BedrockResumeAnalyzer {
  private client: BedrockRuntimeClient;

  constructor() {
    this.client = new BedrockRuntimeClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async analyzeResume(resumeText: string): Promise<ResumeAnalysisResult> {
    const prompt = `
    Analyze this resume and provide structured feedback. Return ONLY valid JSON in this exact format:

    {
      "suggestedCategory": "one of: software-engineering, data-science, devops, cybersecurity, mobile-dev, ai-ml, product-management, marketing-sales, finance-consulting, healthcare, education, legal, hr-recruiting",
      "suggestedLevel": "one of: junior, mid, senior",
      "extractedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
      "recommendations": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
      "confidence": 85
    }

    Resume text:
    ${resumeText}

    Base your analysis on:
    1. Years of experience mentioned
    2. Technical skills and tools
    3. Leadership/management experience
    4. Project complexity and impact
    5. Education and certifications

    Return only the JSON, no other text.
    `;

    try {
      const command = new InvokeModelCommand({
        modelId: "anthropic.claude-3-haiku-20240307-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      const response = await this.client.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      // Extract the content from Claude's response
      const content = responseBody.content[0].text;
      
      // Parse the JSON response
      const analysis = JSON.parse(content);
      
      return analysis;
    } catch (error) {
      console.error('Bedrock analysis error:', error);
      
      // Fallback to mock data if Bedrock fails
      return {
        suggestedCategory: 'software-engineering',
        suggestedLevel: 'mid',
        extractedSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Python'],
        recommendations: [
          'Add more quantified achievements with specific metrics',
          'Include leadership experience and team management',
          'Strengthen technical project descriptions'
        ],
        confidence: 75
      };
    }
  }
}