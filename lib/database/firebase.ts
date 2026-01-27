import { db } from '@/app/(root)/firebase/admin';
import { DatabaseService, InterviewData } from './types';

export class FirebaseService implements DatabaseService {
  async saveInterview(data: InterviewData): Promise<string> {
    const docRef = await db.collection('interviews').add(data);
    return docRef.id;
  }

  async getInterview(id: string): Promise<InterviewData | null> {
    const doc = await db.collection('interviews').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as InterviewData;
  }

  async getUserInterviews(userId: string): Promise<InterviewData[]> {
    const snapshot = await db.collection('interviews')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as InterviewData[];
  }
}