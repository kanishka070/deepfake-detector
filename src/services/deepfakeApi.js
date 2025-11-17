import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const predictVideo = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/api/predict-video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress?.(progress);
      }
    });
    return {
      prediction: response.data.pred === 1 ? 'fake' : 'real',
      confidence: response.data.probs[response.data.pred],
      analysis: {
        'Real Confidence': `${(response.data.probs[0] * 100).toFixed(2)}%`,
        'Fake Confidence': `${(response.data.probs[1] * 100).toFixed(2)}%`,
      },
      frameUrls: response.data.frameUrls || []
    };
  } catch (error) {
    throw error?.response?.data || error;
  }
};
