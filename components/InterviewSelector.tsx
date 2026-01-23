"use client"

import React, { useState } from "react";
import { TECHNICAL_INTERVIEWS, NON_TECHNICAL_INTERVIEWS, EXPERIENCE_LEVELS, COMPANY_TYPES } from "@/constants/interviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Sparkles } from "lucide-react";

interface InterviewSelection {
  category: string;
  type: 'technical' | 'non-technical';
  experienceLevel: string;
  companyType: string;
}

interface ResumeAnalysis {
  suggestedCategory: string;
  suggestedLevel: string;
  extractedSkills: string[];
  recommendations: string[];
  confidence: number;
}

const InterviewSelector = () => {
  const [selection, setSelection] = useState<InterviewSelection>({
    category: '',
    type: 'technical',
    experienceLevel: '',
    companyType: ''
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [useAIRecommendations, setUseAIRecommendations] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      await analyzeResume(file);
    }
  };

  const analyzeResume = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual AI integration later)
    setTimeout(() => {
      const mockAnalysis: ResumeAnalysis = {
        suggestedCategory: 'software-engineering',
        suggestedLevel: 'mid',
        extractedSkills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
        recommendations: [
          'Add more quantified achievements (e.g., "Improved performance by 40%")',
          'Include specific project outcomes and metrics',
          'Strengthen your leadership experience section',
          'Add relevant certifications or courses'
        ],
        confidence: 85
      };
      
      setResumeAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const applyAIRecommendations = () => {
    if (resumeAnalysis) {
      const suggestedType = TECHNICAL_INTERVIEWS.find(t => t.id === resumeAnalysis.suggestedCategory) ? 'technical' : 'non-technical';
      setSelection({
        ...selection,
        category: resumeAnalysis.suggestedCategory,
        type: suggestedType,
        experienceLevel: resumeAnalysis.suggestedLevel
      });
      setUseAIRecommendations(true);
    }
  };

  const handleStartInterview = () => {
    if (selection.category && selection.experienceLevel && selection.companyType) {
      const params = new URLSearchParams({
        category: selection.category,
        level: selection.experienceLevel,
        company: selection.companyType,
        ...(resumeAnalysis && { aiAnalyzed: 'true' })
      });
      window.location.href = `/interview?${params.toString()}`;
    }
  };

  const isComplete = selection.category && selection.experienceLevel && selection.companyType;
  const allInterviews = [...TECHNICAL_INTERVIEWS, ...NON_TECHNICAL_INTERVIEWS];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Choose Your Interview</h1>
        <p className="text-gray-600">Upload your resume for AI-powered recommendations, or select manually</p>
      </div>

      {/* Resume Upload Section */}
      <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI-Powered Resume Analysis
          </CardTitle>
          <CardDescription>
            Upload your resume to get personalized interview recommendations and improvement suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <Label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {resumeFile ? (
                    <>
                      <FileText className="w-8 h-8 mb-2 text-green-500" />
                      <p className="text-sm text-gray-500">{resumeFile.name}</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">Click to upload your resume</p>
                      <p className="text-xs text-gray-500">PDF files only</p>
                    </>
                  )}
                </div>
                <Input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
            </div>
            
            {isAnalyzing && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Analyzing your resume with AI...</p>
              </div>
            )}
            
            {resumeAnalysis && (
              <div className="space-y-4 p-4 bg-white rounded-lg border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-700">✨ AI Analysis Complete</h3>
                  <span className="text-sm text-gray-500">{resumeAnalysis.confidence}% confidence</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Recommended Interview:</h4>
                    <p className="text-sm text-blue-600">
                      {allInterviews.find(i => i.id === resumeAnalysis.suggestedCategory)?.name} - {EXPERIENCE_LEVELS.find(l => l.id === resumeAnalysis.suggestedLevel)?.name}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Extracted Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {resumeAnalysis.extractedSkills.slice(0, 4).map(skill => (
                        <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Resume Improvement Suggestions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {resumeAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={applyAIRecommendations}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={useAIRecommendations}
                >
                  {useAIRecommendations ? '✓ AI Recommendations Applied' : 'Apply AI Recommendations'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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