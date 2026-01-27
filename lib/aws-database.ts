import { DynamoDBClient, PutItemCommand, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_DYNAMODB_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export class AWSDatabase {
  static async createUser(userId: string, userData: any) {
    const command = new PutItemCommand({
      TableName: process.env.AWS_DYNAMODB_USERS_TABLE!,
      Item: marshall({
        userId,
        ...userData,
        createdAt: new Date().toISOString()
      })
    });
    
    return await dynamoClient.send(command);
  }

  static async getUser(userId: string) {
    const command = new GetItemCommand({
      TableName: process.env.AWS_DYNAMODB_USERS_TABLE!,
      Key: marshall({ userId })
    });
    
    const result = await dynamoClient.send(command);
    return result.Item ? unmarshall(result.Item) : null;
  }

  static async saveInterviewSession(sessionData: any) {
    const command = new PutItemCommand({
      TableName: process.env.AWS_DYNAMODB_SESSIONS_TABLE!,
      Item: marshall({
        sessionId: sessionData.sessionId,
        userId: sessionData.userId,
        ...sessionData,
        timestamp: new Date().toISOString()
      })
    });
    
    return await dynamoClient.send(command);
  }
}

export { dynamoClient };