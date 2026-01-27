import { bedrockService } from "@/lib/bedrock";

export async function POST(request: Request) {
  try {
    const { resumeText, action } = await request.json();

    if (action === 'analyze') {
      const analysisPrompt = `Analyze this resume and provide detailed feedback:

${resumeText}

Provide analysis in the following format:
1. **Strengths**: Key strengths and impressive elements
2. **Areas for Improvement**: Specific areas that need work
3. **Technical Skills Assessment**: Evaluation of technical skills mentioned
4. **Experience Evaluation**: Assessment of work experience and projects
5. **Recommendations**: Specific actionable recommendations
6. **Overall Score**: Rate from 1-10 with brief explanation

Keep the analysis professional, constructive, and actionable.`;

      const analysis = await bedrockService.generateInterviewResponse(analysisPrompt, {
        role: 'Resume Analyst',
        level: 'Expert',
        techstack: ['Resume Analysis', 'Career Guidance']
      });

      return Response.json({ success: true, analysis });
    }

    if (action === 'improve') {
      const improvementPrompt = `Based on this resume, provide specific improvement suggestions:

${resumeText}

Generate:
1. **Rewritten Summary**: A more compelling professional summary
2. **Enhanced Bullet Points**: Improve 3-5 key bullet points with metrics and impact
3. **Skills Optimization**: Suggest additional relevant skills to add
4. **Formatting Tips**: Specific formatting improvements
5. **Keywords**: Industry-relevant keywords to include

Provide concrete, actionable improvements.`;

      const improvements = await bedrockService.generateInterviewResponse(improvementPrompt, {
        role: 'Resume Writer',
        level: 'Expert', 
        techstack: ['Resume Writing', 'Career Development']
      });

      return Response.json({ success: true, improvements });
    }

    return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Resume analysis error:", error);
    return Response.json({ success: false, error: "Analysis service unavailable" }, { status: 500 });
  }
}