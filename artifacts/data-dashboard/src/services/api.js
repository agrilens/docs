import axios from 'axios';

const API_URL = 'https://api.hyperbolic.xyz/v1/chat/completions';
const API_KEY = process.env.REACT_APP_API_KEY;

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

    const requestBody = {
      model: 'Qwen/Qwen2-VL-72B-Instruct',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant specialized in plant health analysis. Analyze the given image and provide a structured response including overall health status, pest identification, disease identification, weed presence, and recommendations.'
        },
        {
          role: 'user',
          content: [
            { type: "text", text: 'Analyze this plant image for health issues:'},
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
          ]
        }
      ],
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 0.9,
      stream: false
    };

    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    console.log('API Response:', response.data);

    const content = response.data.choices[0].message.content;
    console.log('API Content:', content);

    // Parse the content into a structured object
    const parsedData = parseAnalysisContent(content);

    return parsedData;
  } catch (error) {
    console.error('Full error object:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

function parseAnalysisContent(content) {
  const sections = content.split('**').filter(s => s.trim());
  const parsed = {};

  sections.forEach(section => {
    const [key, ...value] = section.split(':');
    if (key && value.length) {
      parsed[key.trim().toLowerCase().replace(/\s+/g, '_')] = value.join(':').trim();
    }
  });

  // Extract numeric health score
  parsed.health_score = getHealthScore(parsed.overall_health_status);

  // Parse recommendations into an array
  if (parsed.recommendations) {
    parsed.recommendations = parsed.recommendations
      .split(/\d+\./)
      .filter(r => r.trim())
      .map(r => r.trim());
  }

  console.log('Parsed content:', parsed);
  return parsed;
}

function getHealthScore(healthStatus) {
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
}