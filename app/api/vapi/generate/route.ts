import { aiService } from "@/lib/ai";
import { databaseService } from "@/lib/database";

export async function GET() {
    return Response.json({ success: true, data: "THANK YOU" }, { status: 200 });
}

export async function POST(request: Request) {
    const {type, role, level, techstack, amount, userid} = await request.json();

    try {
        const questions = await aiService.generateInterviewQuestions({
            role, level, techstack, amount
        });
        
        const interview = {
            role, type, level, 
            techstack,
            questions,
            userId: userid,
            finalized: true,
            createdAt: new Date().toISOString(),
        }
        
        await databaseService.saveInterview(interview);

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