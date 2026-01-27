// Test script to verify Firebase database connection
// Run with: node test-db.js

const admin = require('firebase-admin');

// Initialize Firebase Admin (use your service account key)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'partner-ai-b850f'
  });
}

const db = admin.firestore();

async function testDatabase() {
  try {
    // Test write
    console.log('Testing database write...');
    const testDoc = await db.collection('test').add({
      message: 'Hello from test script',
      timestamp: new Date().toISOString()
    });
    console.log('✅ Write successful, document ID:', testDoc.id);

    // Test read
    console.log('Testing database read...');
    const snapshot = await db.collection('test').limit(1).get();
    if (!snapshot.empty) {
      console.log('✅ Read successful, found documents:', snapshot.size);
      snapshot.forEach(doc => {
        console.log('Document data:', doc.data());
      });
    }

    // Clean up
    await testDoc.delete();
    console.log('✅ Cleanup successful');

  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

testDatabase();