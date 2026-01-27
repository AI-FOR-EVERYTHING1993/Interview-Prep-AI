export class VapiService {
  private token: string;
  private baseUrl = 'https://api.vapi.ai';

  constructor() {
    this.token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!;
  }

  async createCall(interviewData: {
    role: string;
    level: string;
    techstack: string[];
  }) {
    const assistant = {
      model: {
        provider: "custom-llm",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/voice/conversation`,
        model: "bedrock-claude"
      },
      voice: {
        provider: "11labs",
        voiceId: "professional-interviewer"
      },
      firstMessage: `Hello! I'm your AI interviewer for this ${interviewData.role} position. This will be a 20-minute conversation covering technical and behavioral questions. Are you ready to begin?`,
      systemMessage: `You are conducting a professional interview for a ${interviewData.level} ${interviewData.role} position. Focus on ${interviewData.techstack.join(', ')} technologies. Be encouraging but thorough.`
    };

    const response = await fetch(`${this.baseUrl}/call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assistant,
        phoneNumberId: null, // Web call
        customer: {
          number: null
        }
      })
    });

    return await response.json();
  }

  async endCall(callId: string) {
    const response = await fetch(`${this.baseUrl}/call/${callId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    return await response.json();
  }
}