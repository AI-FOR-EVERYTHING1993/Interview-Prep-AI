import { 
  CognitoIdentityProviderClient, 
  InitiateAuthCommand, 
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand 
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export class AuthService {
  static async signUp(email: string, password: string, name: string) {
    try {
      const command = new SignUpCommand({
        ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID!,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'name', Value: name }
        ]
      });
      
      return await cognitoClient.send(command);
    } catch (error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
  }

  static async confirmSignUp(email: string, code: string) {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID!,
        Username: email,
        ConfirmationCode: code
      });
      
      return await cognitoClient.send(command);
    } catch (error) {
      throw new Error(`Confirmation failed: ${error.message}`);
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const command = new InitiateAuthCommand({
        ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID!,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password
        }
      });
      
      const response = await cognitoClient.send(command);
      return {
        accessToken: response.AuthenticationResult?.AccessToken,
        idToken: response.AuthenticationResult?.IdToken,
        refreshToken: response.AuthenticationResult?.RefreshToken
      };
    } catch (error) {
      throw new Error(`Sign in failed: ${error.message}`);
    }
  }

  static async resendCode(email: string) {
    try {
      const command = new ResendConfirmationCodeCommand({
        ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID!,
        Username: email
      });
      
      return await cognitoClient.send(command);
    } catch (error) {
      throw new Error(`Resend code failed: ${error.message}`);
    }
  }
}