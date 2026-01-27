'use client';

import { useState } from 'react';

export default function TestIntegrations() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const testBedrock = async () => {
    setLoading(prev => ({ ...prev, bedrock: true }));
    try {
      const response = await fetch('/api/test-bedrock', { method: 'POST' });
      const data = await response.json();
      setResults(prev => ({ ...prev, bedrock: { success: response.ok, data } }));
    } catch (error) {
      setResults(prev => ({ ...prev, bedrock: { success: false, error: error.message } }));
    }
    setLoading(prev => ({ ...prev, bedrock: false }));
  };

  const testS3 = async () => {
    setLoading(prev => ({ ...prev, s3: true }));
    try {
      const response = await fetch('/api/test-s3');
      const data = await response.json();
      setResults(prev => ({ ...prev, s3: { success: response.ok, data } }));
    } catch (error) {
      setResults(prev => ({ ...prev, s3: { success: false, error: error.message } }));
    }
    setLoading(prev => ({ ...prev, s3: false }));
  };

  const testFirebase = async () => {
    setLoading(prev => ({ ...prev, firebase: true }));
    try {
      const response = await fetch('/api/test-firebase');
      const data = await response.json();
      setResults(prev => ({ ...prev, firebase: { success: response.ok, data } }));
    } catch (error) {
      setResults(prev => ({ ...prev, firebase: { success: false, error: error.message } }));
    }
    setLoading(prev => ({ ...prev, firebase: false }));
  };

  const testGemini = async () => {
    setLoading(prev => ({ ...prev, gemini: true }));
    try {
      const response = await fetch('/api/test-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Hello test' })
      });
      const data = await response.json();
      setResults(prev => ({ ...prev, gemini: { success: response.ok, data } }));
    } catch (error) {
      setResults(prev => ({ ...prev, gemini: { success: false, error: error.message } }));
    }
    setLoading(prev => ({ ...prev, gemini: false }));
  };

  const TestButton = ({ name, onClick, loading: isLoading }: any) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {isLoading ? 'Testing...' : `Test ${name}`}
    </button>
  );

  const ResultDisplay = ({ name, result }: any) => (
    <div className="mt-4 p-4 border rounded">
      <h3 className="font-bold">{name} Result:</h3>
      {result ? (
        <div className={`mt-2 ${result.success ? 'text-green-600' : 'text-red-600'}`}>
          <div>Status: {result.success ? '✅ Success' : '❌ Failed'}</div>
          <pre className="mt-2 text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(result.success ? result.data : result.error, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="text-gray-500">No test run yet</div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Integration Tests</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <TestButton name="Bedrock" onClick={testBedrock} loading={loading.bedrock} />
        <TestButton name="S3" onClick={testS3} loading={loading.s3} />
        <TestButton name="Firebase" onClick={testFirebase} loading={loading.firebase} />
        <TestButton name="Gemini" onClick={testGemini} loading={loading.gemini} />
      </div>

      <div className="space-y-4">
        <ResultDisplay name="AWS Bedrock" result={results.bedrock} />
        <ResultDisplay name="AWS S3" result={results.s3} />
        <ResultDisplay name="Firebase" result={results.firebase} />
        <ResultDisplay name="Google Gemini" result={results.gemini} />
      </div>
    </div>
  );
}