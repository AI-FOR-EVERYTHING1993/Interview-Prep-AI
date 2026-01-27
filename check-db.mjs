// Quick test to check Firebase database
import { db } from './app/(root)/firebase/admin.js';

async function checkDatabase() {
  try {
    const snapshot = await db.collection('interviews').limit(5).get();
    console.log('Found', snapshot.size, 'interviews in database');
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('Interview ID:', doc.id);
      console.log('Role:', data.role);
      console.log('Questions:', data.questions?.length || 0);
      console.log('---');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDatabase();