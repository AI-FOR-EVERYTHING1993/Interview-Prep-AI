import { success } from "zod";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/app/(root)/firebase/admin";

export async function GET() {
    return Response.json({ success: true, data: "THANK YOU" }, { status: 200 });
}

export async function POST(request: Request) {
    const {type, role, level, techstack, amount, userid} = await request.json();

    try {
        const {text} = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `Prepare questions for the job interview.
            The job role is ${role}. The experience level is ${level}.
            The tech stack is ${techstack.join(', ')}.
            Generate ${amount} questions.
            Format the output as a JSON array of strings.`,
            maxCompletionTokens: 1000,
        });
        
        // Parse the AI response
        const questions = JSON.parse(text);
        
        const interview = {
            role, type, level, 
            techstack,
            questions,
            userId: userid,
            finalized: true,
            createdAt: new Date().toISOString(),
        }
        
        await db.collection('interviews').add(interview);

        return Response.json({ success: true, data: questions }, { status: 200 });
        
    } catch (error) {
        console.log("Error generating interview questions:", error);
        
        // Fallback to mock questions if AI fails
        const fallbackQuestions = [
            `Tell me about your experience with ${techstack.join(', ')}.`,
            `How would you approach a ${level} level ${role} challenge?`,
            `Describe a project where you used ${techstack[0]}.`,
            `What interests you most about this ${role} position?`,
            `How do you stay updated with ${techstack[0]} developments?`
        ];
        
        return Response.json({ 
            success: true, 
            data: fallbackQuestions.slice(0, amount) 
        }, { status: 200 });
    }
}