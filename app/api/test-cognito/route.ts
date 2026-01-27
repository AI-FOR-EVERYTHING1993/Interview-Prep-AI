import { NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, DescribeUserPoolCommand } from '@aws-sdk/client-cognito-identity-provider';

export async function GET() {
  try {
    const client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    });

    const command = new DescribeUserPoolCommand({
      UserPoolId: "us-east-1_FCKr3fbQB"
    });

    const response = await client.send(command);
    
    return NextResponse.json({ 
      success: true,
      userPool: response.UserPool?.Name,
      clientId: "34nps2i93ojh5mfjbgn1sm5s5s",
      status: "Cognito is connected!"
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}