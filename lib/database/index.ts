import { DatabaseService } from './types';
import { FirebaseService } from './firebase';

// For now, just use Firebase. AWS can be added later when needed.
export const databaseService: DatabaseService = new FirebaseService();