"use client"

import React, { useEffect, useState } from 'react';
import ResumeReviewResults from '@/components/ResumeReviewResults';
import AuthGuard from '@/components/AuthGuard';

const ResumeResultsPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get analysis from sessionStorage first
    const storedAnalysis = sessionStorage.getItem('resumeAnalysis');
    
    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis));
      setLoading(false);
      return;
    }

    // Fallback to mock analysis
    const mockAnalysis = {
      overallScore: 85,
      atsScore: 78,
      industryMatch: "Software Engineering",
      experienceLevel: "Mid-Level",
      strengths: [
        "Strong technical skills with modern frameworks and languages",
        "Quantified achievements showing measurable business impact",
        "Clear career progression with increasing responsibilities",
        "Relevant certifications and continuous learning mindset",
        "Clean, professional formatting that's ATS-friendly"
      ],
      improvements: [
        "Add more leadership and team collaboration examples",
        "Include specific metrics for project impact and ROI",
        "Strengthen the professional summary with unique value proposition",
        "Add industry-specific keywords for better ATS optimization",
        "Include soft skills and communication abilities"
      ],
      keywordOptimization: {
        missing: ["Agile", "Scrum", "CI/CD", "Cloud Architecture", "Microservices"],
        present: ["JavaScript", "React", "Node.js", "AWS", "Git"],
        suggestions: [
          "Add 'Agile methodology' to project descriptions",
          "Include 'CI/CD pipeline' in technical experience section",
          "Mention 'cloud architecture' and 'scalability' experience",
          "Add 'cross-functional collaboration' to demonstrate teamwork"
        ]
      },
      industryInsights: {
        topSkills: ["Cloud Computing", "AI/ML", "DevOps", "Cybersecurity", "Data Science"],
        emergingTrends: ["Generative AI Integration", "Edge Computing", "Serverless Architecture"],
        salaryRange: "$95K - $140K",
        demandLevel: "Very High"
      },
      recruiterTips: [
        "Start each bullet point with strong action verbs (Led, Developed, Optimized)",
        "Quantify every achievement with specific numbers and percentages",
        "Tailor your resume keywords to match each job description",
        "Keep technical skills section updated with latest technologies"
      ],
      nextSteps: [
        "Update your technical skills with trending technologies like AI/ML",
        "Add 2-3 quantified achievements for each previous role",
        "Create a compelling professional summary highlighting your unique value",
        "Optimize for ATS by including relevant industry keywords",
        "Practice behavioral interview questions using the STAR method",
        "Build a portfolio showcasing your best technical projects"
      ]
    };

    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Resume</h2>
            <p className="text-gray-600">Our AI is reviewing your resume with insights from top recruiters...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <ResumeReviewResults resumeAnalysis={analysis} />
    </AuthGuard>
  );
};

export default ResumeResultsPage;