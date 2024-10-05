import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzePlantHealth } from '../services/api';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const result = await analyzePlantHealth(formData);
      
      // Display current analysis
      setCurrentAnalysis(result);

      // Store the new analysis with existing ones
      const existingAnalyses = JSON.parse(localStorage.getItem('plantAnalyses') || '[]');
      existingAnalyses.push({
        id: Date.now(),
        fileName: file.name,
        ...result
      });
      localStorage.setItem('plantAnalyses', JSON.stringify(existingAnalyses));
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Error analyzing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Plant Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit" disabled={!file || isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {currentAnalysis && (
        <div>
          <h2>Current Analysis Result</h2>
          <pre>{JSON.stringify(currentAnalysis, null, 2)}</pre>
        </div>
      )}

      <button onClick={() => navigate('/dashboard')}>View Dashboard</button>
    </div>
  );
}

export default UploadPage;