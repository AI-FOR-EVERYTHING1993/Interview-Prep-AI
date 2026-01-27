import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENARATIVE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(message || 'Say hello');
    const response = await result.response;
    
    return NextResponse.json({ 
      success: true, 
      result: response.text() 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}