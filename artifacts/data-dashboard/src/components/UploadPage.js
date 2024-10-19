import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzePlantHealth, storeAnalysis } from '../services/api';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
  
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);
      console.log('Sending image for analysis...');
      const result = await analyzePlantHealth(formData);
      
      console.log('Analysis result:', result);
      
      // Display current analysis
      setCurrentAnalysis(result);
  
      // Store the new analysis
      const newAnalysis = {
        fileName: file.name,
        ...result
      };
      
      console.log('Storing analysis...');
      // Use the server to store the analysis
      await storeAnalysis(newAnalysis);
      console.log('Analysis stored successfully');
  
    } catch (error) {
      console.error('Error analyzing image:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setError('Error analyzing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload Plant Image</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*" 
          aria-label="Select an image file"
        />
        <button type="submit" disabled={!file || isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {isLoading && <p>Analyzing image...</p>}

      {currentAnalysis && (
        <div className="analysis-result">
          <h2>Current Analysis Result</h2>
          <dl>
            <dt>Overall Health Status:</dt>
            <dd>{currentAnalysis.overall_health_status}</dd>
            <dt>Health Score:</dt>
            <dd>{currentAnalysis.health_score}</dd>
            <dt>Pest Identification:</dt>
            <dd>{currentAnalysis.pest_identification}</dd>
            <dt>Disease Identification:</dt>
            <dd>{currentAnalysis.disease_identification}</dd>
            <dt>Weed Presence:</dt>
            <dd>{currentAnalysis.weed_presence}</dd>
            <dt>Recommendations:</dt>
            <dd>
              <ul>
                {currentAnalysis.recommendations && currentAnalysis.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      )}

      <button onClick={() => navigate('/dashboard')} className="dashboard-button">
        View Dashboard
      </button>
    </div>
  );
}

export default UploadPage;