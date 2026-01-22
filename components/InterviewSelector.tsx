"use client"

import React, { useState } from "react";
import { TECHNICAL_INTERVIEWS, NON_TECHNICAL_INTERVIEWS, EXPERIENCE_LEVELS, COMPANY_TYPES } from "@/constants/interviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InterviewSelection {
  category: string;
  type: 'technical' | 'non-technical';
  experienceLevel: string;
  companyType: string;
}

const InterviewSelector = () => {
  const [selection, setSelection] = useState<InterviewSelection>({
    category: '',
    type: 'technical',
    experienceLevel: '',
    companyType: ''
  });

  const handleStartInterview = () => {
    if (selection.category && selection.experienceLevel && selection.companyType) {
      // Navigate to interview with selected parameters
      window.location.href = `/interview?category=${selection.category}&level=${selection.experienceLevel}&company=${selection.companyType}`;
    }
  };

  const isComplete = selection.category && selection.experienceLevel && selection.companyType;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Choose Your Interview</h1>
        <p className="text-gray-600">Select the type of interview you want to practice</p>
      </div>

      {/* Interview Type Toggle */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSelection({...selection, type: 'technical', category: ''})}
            className={`px-6 py-2 rounded-md transition-colors ${
              selection.type === 'technical' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Technical
          </button>
          <button
            onClick={() => setSelection({...selection, type: 'non-technical', category: ''})}
            className={`px-6 py-2 rounded-md transition-colors ${
              selection.type === 'non-technical' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Non-Technical
          </button>
        </div>
      </div>

      {/* Interview Categories */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Interview Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(selection.type === 'technical' ? TECHNICAL_INTERVIEWS : NON_TECHNICAL_INTERVIEWS).map((interview) => (
            <Card 
              key={interview.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selection.category === interview.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelection({...selection, category: interview.id})}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{interview.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{interview.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Experience Level</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXPERIENCE_LEVELS.map((level) => (
            <Card 
              key={level.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selection.experienceLevel === level.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelection({...selection, experienceLevel: level.id})}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{level.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{level.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Type */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Company Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPANY_TYPES.map((company) => (
            <Card 
              key={company.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selection.companyType === company.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelection({...selection, companyType: company.id})}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{company.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleStartInterview}
          disabled={!isComplete}
          className="px-8 py-3 text-lg"
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewSelector;