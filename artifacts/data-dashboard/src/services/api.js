import axios from 'axios';

const API_URL = 'https://api.hyperbolic.xyz/v1/chat/completions';
const API_KEY = process.env.REACT_APP_API_KEY;

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

    // Instead of parsing JSON, we'll return the text content
    return response.data.choices[0].message.content;
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

// Helper function to convert file to base64 (unchanged)
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
};