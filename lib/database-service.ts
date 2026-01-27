import { 
  DynamoDBClient, 
  PutItemCommand, 
  GetItemCommand, 
  QueryCommand,
  UpdateItemCommand,
  DeleteItemCommand 
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export class DatabaseService {
  // User Management
  static async createUser(userId: string, userData: any) {
    const command = new PutItemCommand({
      TableName: 'interview-prep-users',
      Item: marshall({
        userId,
        email: userData.email,
        name: userData.name,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        interviewCount: 0,
        ...userData
      })
    });
    
    return await dynamoClient.send(command);
  }

  static async getUser(userId: string) {
    const command = new GetItemCommand({
      TableName: 'interview-prep-users',
      Key: marshall({ userId })
    });
    
    const result = await dynamoClient.send(command);
    return result.Item ? unmarshall(result.Item) : null;
  }

  static async updateUser(userId: string, updates: any) {
    const updateExpression = Object.keys(updates)
      .map(key => `#${key} = :${key}`)
      .join(', ');
    
    const expressionAttributeNames = Object.keys(updates)
      .reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
    
    const expressionAttributeValues = marshall(
      Object.keys(updates).reduce((acc, key) => ({ ...acc, [`:${key}`]: updates[key] }), {})
    );

    const command = new UpdateItemCommand({
      TableName: 'interview-prep-users',
      Key: marshall({ userId }),
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
    });
    
    return await dynamoClient.send(command);
  }

  // Interview Sessions
  static async saveInterviewSession(sessionData: any) {
    const command = new PutItemCommand({
      TableName: 'interview-prep-sessions',
      Item: marshall({
        sessionId: sessionData.sessionId,
        userId: sessionData.userId,
        type: sessionData.type, // 'technical', 'behavioral', 'system-design'
        questions: sessionData.questions,
        answers: sessionData.answers,
        feedback: sessionData.feedback,
        score: sessionData.score,
        duration: sessionData.duration,
        createdAt: new Date().toISOString(),
        ...sessionData
      })
    });
    
    return await dynamoClient.send(command);
  }

  static async getUserSessions(userId: string) {
    const command = new QueryCommand({
      TableName: 'interview-prep-sessions',
      IndexName: 'UserIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: marshall({ ':userId': userId }),
      ScanIndexForward: false // Most recent first
    });
    
    const result = await dynamoClient.send(command);
    return result.Items?.map(item => unmarshall(item)) || [];
  }

  static async getSession(sessionId: string) {
    const command = new GetItemCommand({
      TableName: 'interview-prep-sessions',
      Key: marshall({ sessionId })
    });
    
    const result = await dynamoClient.send(command);
    return result.Item ? unmarshall(result.Item) : null;
  }

  static async deleteSession(sessionId: string) {
    const command = new DeleteItemCommand({
      TableName: 'interview-prep-sessions',
      Key: marshall({ sessionId })
    });
    
    return await dynamoClient.send(command);
  }
}