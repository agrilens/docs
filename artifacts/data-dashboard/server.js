const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize NeDB database
const db = new Datastore({ filename: 'analyses.db', autoload: true });

const HYPERBOLIC_API_URL = 'https://api.hyperbolic.xyz/v1/chat/completions';
const API_KEY = process.env.HYPERBOLIC_API_KEY;

app.post('/api/analyze-plant', async (req, res) => {
    try {
      console.log('Received request to analyze plant');
      const { image } = req.body;
      if (!image) {
        console.error('No image received in request');
        return res.status(400).json({ error: 'No image provided' });
      }
  
      console.log('Preparing request to Hyperbolic API');
      const requestBody = {
        model: 'Qwen/Qwen2-VL-72B-Instruct',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant specialized in plant health analysis. Analyze the given image and provide a structured response in the following JSON format:
            {
              "overall_health_status": "Healthy|Mild Issues|Moderate Issues|Severe Issues",
              "health_score": <number between 0 and 100>,
              "pest_identification": "<description of any pests found or 'None detected'>",
              "disease_identification": "<description of any diseases found or 'None detected'>",
              "weed_presence": "<description of any weeds found or 'None detected'>",
              "recommendations": [
                "<recommendation 1>",
                "<recommendation 2>",
                ...
              ]
            }
            Ensure all fields are filled out based on your analysis of the image.`
          },
          {
            role: 'user',
            content: [
              { type: "text", text: 'Analyze this plant image for health issues:'},
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${image}` } }
            ]
          }
        ],
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      };
  
      console.log('Sending request to Hyperbolic API');
      const response = await axios.post(HYPERBOLIC_API_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });
  
      console.log('Received response from Hyperbolic API');
      const aiResponse = response.data.choices[0].message.content;
      console.log('AI Response:', aiResponse);

      // Strip out Markdown code block syntax if present
      const jsonString = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
  
      // Parse the JSON response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(aiResponse);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        return res.status(500).json({ error: 'Error parsing AI response' });
      }
  
      // Validate and sanitize the parsed response
      const sanitizedResponse = {
        overall_health_status: parsedResponse.overall_health_status || 'Unknown',
        health_score: Number(parsedResponse.health_score) || 0,
        pest_identification: parsedResponse.pest_identification || 'No information provided',
        disease_identification: parsedResponse.disease_identification || 'No information provided',
        weed_presence: parsedResponse.weed_presence || 'No information provided',
        recommendations: Array.isArray(parsedResponse.recommendations) ? parsedResponse.recommendations : []
      };
  
      console.log('Sending sanitized response:', sanitizedResponse);
      res.json(sanitizedResponse);
    } catch (error) {
      console.error('Error in /api/analyze-plant:', error);
      if (error.response) {
        console.error('Hyperbolic API error response:', error.response.data);
      }
      res.status(500).json({ error: 'An error occurred while analyzing the plant' });
    }
  });

app.post('/api/analyses', (req, res) => {
  const newAnalysis = req.body;
  db.insert(newAnalysis, (err, newDoc) => {
    if (err) {
      console.error('Error storing analysis:', err);
      res.status(500).json({ error: 'An error occurred while storing the analysis' });
    } else {
      console.log('Analysis stored successfully:', newDoc);
      res.status(201).json({ message: 'Analysis stored successfully', analysis: newDoc });
    }
  });
});

app.get('/api/analyses', (req, res) => {
  db.find({}).sort({ createdAt: -1 }).limit(10).exec((err, analyses) => {
    if (err) {
      console.error('Error fetching analyses:', err);
      res.status(500).json({ error: 'An error occurred while fetching analyses' });
    } else {
      res.json(analyses);
    }
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});