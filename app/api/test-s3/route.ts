import { NextResponse } from 'next/server';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

export async function GET() {
  try {
    const client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    });

    const command = new ListBucketsCommand({});
    const response = await client.send(command);
    
    return NextResponse.json({ 
      success: true, 
      buckets: response.Buckets?.map(b => b.Name) || [] 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}