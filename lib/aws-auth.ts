import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_COGNITO_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export class AWSAuth {
  static async signUp(email: string, password: string) {
    const command = new SignUpCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email }
      ]
    });
    
    return await cognitoClient.send(command);
  }

  static async signIn(email: string, password: string) {
    const command = new InitiateAuthCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    });
    
    return await cognitoClient.send(command);
  }
}

export { cognitoClient };