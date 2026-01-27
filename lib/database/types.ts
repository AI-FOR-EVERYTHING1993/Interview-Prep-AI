// Database abstraction interface
export interface DatabaseService {
  saveInterview(data: InterviewData): Promise<string>;
  getInterview(id: string): Promise<InterviewData | null>;
  getUserInterviews(userId: string): Promise<InterviewData[]>;
}

export interface InterviewData {
  id?: string;
  role: string;
  type: string;
  level: string;
  techstack: string[];
  questions: string[];
  userId: string;
  finalized: boolean;
  createdAt: string;
}

export interface DatabaseConfig {
  useAWS: boolean;
  useDualWrite: boolean;
}