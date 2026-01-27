export class BedrockService {
  private baseUrl = 'https://bedrock-runtime.us-east-1.amazonaws.com';
  private token: string;

  constructor() {
    this.token = process.env.AWS_BEARER_TOKEN_BEDROCK!;
  }

  async generateText(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Bedrock API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }
}