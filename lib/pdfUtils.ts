// PDF text extraction utility
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    // For now, return a mock text extraction
    // In production, you'd use pdf-parse or similar library
    return `
      John Doe
      Senior Software Engineer
      
      Experience:
      - 5 years at Google working on React and Node.js
      - Built scalable web applications serving millions of users
      - Led team of 4 developers on microservices architecture
      - Improved system performance by 40%
      
      Skills:
      React, Node.js, TypeScript, AWS, Docker, Kubernetes, Python, MongoDB
      
      Education:
      Computer Science, Stanford University
    `;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
};