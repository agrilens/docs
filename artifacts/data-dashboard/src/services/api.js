import axios from 'axios';

const API_URL = '/api'; // This will be proxied to your Express server

// Helper function to convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

export const analyzePlantHealth = async (formData) => {
  try {
    const file = formData.get('image');
    console.log('File:', file.name, file.type, file.size);

    const base64Image = await convertToBase64(file);
    console.log('Base64 Image (first 100 chars):', base64Image.substring(0, 100));

    const response = await axios.post(`${API_URL}/analyze-plant`, { image: base64Image }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error in analyzePlantHealth:', error);
    throw error;
  }
};

export const storeAnalysis = async (analysis) => {
  try {
    const response = await axios.post(`${API_URL}/analyses`, analysis);
    return response.data;
  } catch (error) {
    console.error('Error in storeAnalysis:', error);
    throw error;
  }
};

// This function is kept for backwards compatibility, in case it's still used elsewhere
export const getHealthScore = (healthStatus) => {
  if (!healthStatus) {
    console.warn('Health status is undefined or empty');
    return 0;  // Default score when health status is missing
  }

  const lowercaseStatus = healthStatus.toLowerCase();
  if (lowercaseStatus.includes('healthy')) return 100;
  if (lowercaseStatus.includes('some issues') || lowercaseStatus.includes('mild')) return 70;
  if (lowercaseStatus.includes('moderate')) return 50;
  if (lowercaseStatus.includes('severe')) return 30;
  console.warn('Unrecognized health status:', healthStatus);
  return 0;  // Default for very poor health or unrecognized status
};