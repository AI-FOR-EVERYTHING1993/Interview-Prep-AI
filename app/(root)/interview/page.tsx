"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Agent from '@/components/Agent';
import { TECHNICAL_INTERVIEWS, NON_TECHNICAL_INTERVIEWS, EXPERIENCE_LEVELS } from '@/constants/interviews';

interface InterviewData {
  role: string;
  level: string;
  techstack: string[];
  type: 'technical' | 'non-technical';
  category: string;
}

const InterviewPage = () => {
  const searchParams = useSearchParams();
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);

  useEffect(() => {
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const type = searchParams.get('type') as 'technical' | 'non-technical';
    const skills = searchParams.get('skills');

    if (category && level) {
      const allInterviews = [...TECHNICAL_INTERVIEWS, ...NON_TECHNICAL_INTERVIEWS];
      const selectedInterview = allInterviews.find(i => i.id === category);
      const selectedLevel = EXPERIENCE_LEVELS.find(l => l.id === level);

      if (selectedInterview && selectedLevel) {
        const techstack = skills ? skills.split(',') : 
          (type === 'technical' ? ['JavaScript', 'React', 'Node.js'] : ['Communication', 'Leadership']);

        setInterviewData({
          role: selectedInterview.name,
          level: selectedLevel.name,
          techstack,
          type: type || 'technical',
          category
        });
      }
    }
  }, [searchParams]);

  if (!interviewData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Interview...</h1>
          <p className="text-gray-600">Preparing your personalized interview experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {interviewData.role} Interview
          </h1>
          <p className="text-gray-300">
            {interviewData.level} Level • {interviewData.type === 'technical' ? 'Technical' : 'Non-Technical'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Focus: {interviewData.techstack.join(', ')}
          </p>
        </div>

        <Agent 
          userName="Candidate"
          interviewData={interviewData}
        />
      </div>
    </div>
  );
};

export default InterviewPage;