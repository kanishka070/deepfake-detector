// Mock data store
let analysisHistory = [];
let analysisIdCounter = 1;

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate random analysis result
const generateMockResult = (file) => {
  const predictions = ['real', 'fake', 'uncertain'];
  const prediction = predictions[Math.floor(Math.random() * predictions.length)];
  
  const confidence = prediction === 'uncertain' 
    ? 0.3 + Math.random() * 0.4  // 30-70% for uncertain
    : 0.7 + Math.random() * 0.3; // 70-100% for real/fake

  return {
    id: analysisIdCounter++,
    filename: file.name,
    fileType: file.type,
    fileSize: file.size,
    prediction,
    confidence,
    analysis: {
      'Facial Manipulation': prediction === 'fake' ? 'Detected' : 'Not Detected',
      'Temporal Consistency': prediction === 'fake' ? 'Inconsistent' : 'Consistent',
      'Compression Artifacts': prediction === 'fake' ? 'Present' : 'Minimal',
      'Blending Quality': prediction === 'fake' ? 'Poor' : 'Natural',
      'Eye Movement': file.type.startsWith('video/') ? 'Analyzed' : 'N/A'
    },
    timestamp: new Date().toISOString(),
    processingTime: `${(2 + Math.random() * 3).toFixed(1)}s`
  };
};

// Mock API functions
export const deepfakeAPI = {
  // Upload and analyze media file
  analyzeMedia: async (file, onProgress) => {
    console.log('🔄 Mock API: Analyzing file...', file.name);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await delay(200);
      onProgress?.(i);
    }

    // Simulate processing delay
    await delay(1500);

    const result = generateMockResult(file);
    
    // Save to history
    analysisHistory.unshift(result);
    
    console.log('✅ Mock API: Analysis complete', result);
    return result;
  },

  // Get analysis by ID
  getAnalysis: async (analysisId) => {
    console.log('🔄 Mock API: Fetching analysis...', analysisId);
    await delay(500);

    const analysis = analysisHistory.find(item => item.id === parseInt(analysisId));
    
    if (!analysis) {
      throw { message: 'Analysis not found', status: 404 };
    }

    console.log('✅ Mock API: Analysis fetched', analysis);
    return analysis;
  },

  // Get analysis history
  getHistory: async (page = 1, limit = 10) => {
    console.log('🔄 Mock API: Fetching history...');
    await delay(800);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = analysisHistory.slice(startIndex, endIndex);

    const response = {
      results: paginatedResults,
      total: analysisHistory.length,
      page,
      totalPages: Math.ceil(analysisHistory.length / limit)
    };

    console.log('✅ Mock API: History fetched', response);
    return response;
  },

  // Delete analysis
  deleteAnalysis: async (analysisId) => {
    console.log('🔄 Mock API: Deleting analysis...', analysisId);
    await delay(500);

    const index = analysisHistory.findIndex(item => item.id === parseInt(analysisId));
    
    if (index === -1) {
      throw { message: 'Analysis not found', status: 404 };
    }

    analysisHistory.splice(index, 1);
    
    console.log('✅ Mock API: Analysis deleted');
    return { success: true };
  }
};

// Optional: Pre-populate with some sample data
const initializeSampleData = () => {
  const sampleFiles = [
    { name: 'video_sample.mp4', type: 'video/mp4', size: 15728640 },
    { name: 'profile_photo.jpg', type: 'image/jpeg', size: 2097152 },
    { name: 'interview_clip.mov', type: 'video/quicktime', size: 31457280 }
  ];

  sampleFiles.forEach(file => {
    const result = generateMockResult(file);
    result.timestamp = new Date(Date.now() - Math.random() * 86400000 * 7).toISOString();
    analysisHistory.push(result);
  });
};

// Initialize sample data on load
initializeSampleData();

export default { deepfakeAPI };
