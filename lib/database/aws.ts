import { DatabaseService, InterviewData } from './types';
import { randomUUID } from 'crypto';

export class AWSService implements DatabaseService {
  private client: any = null;
  private tableName = 'InterviewPrepAI-Interviews';

  private async getClient() {
    if (!this.client) {
      const { DynamoDBClient } = await import('@aws-sdk/client-dynamodb');
      const { DynamoDBDocumentClient } = await import('@aws-sdk/lib-dynamodb');
      
      const dynamoClient = new DynamoDBClient({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        }
      });
      this.client = DynamoDBDocumentClient.from(dynamoClient);
    }
    return this.client;
  }

  async saveInterview(data: InterviewData): Promise<string> {
    const client = await this.getClient();
    const { PutCommand } = await import('@aws-sdk/lib-dynamodb');
    
    const id = randomUUID();
    const item = { ...data, id };
    
    await client.send(new PutCommand({
      TableName: this.tableName,
      Item: item
    }));
    
    return id;
  }

  async getInterview(id: string): Promise<InterviewData | null> {
    const client = await this.getClient();
    const { GetCommand } = await import('@aws-sdk/lib-dynamodb');
    
    const result = await client.send(new GetCommand({
      TableName: this.tableName,
      Key: { id }
    }));
    
    return result.Item as InterviewData || null;
  }

  async getUserInterviews(userId: string): Promise<InterviewData[]> {
    const client = await this.getClient();
    const { QueryCommand } = await import('@aws-sdk/lib-dynamodb');
    
    const result = await client.send(new QueryCommand({
      TableName: this.tableName,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId },
      ScanIndexForward: false
    }));
    
    return result.Items as InterviewData[] || [];
  }
}