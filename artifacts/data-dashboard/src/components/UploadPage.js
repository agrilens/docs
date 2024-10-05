import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzePlantHealth } from '../services/api';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile.name, selectedFile.type, selectedFile.size);
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    try {
      console.log('Submitting file:', file.name, file.type, file.size);
      const formData = new FormData();
      formData.append('image', file);
      const result = await analyzePlantHealth(formData);
      console.log('Analysis result:', result);
      // Store the raw text result
      localStorage.setItem('analysisResult', result);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('Error analyzing image. Please check the console for more details.');
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
    </div>
  );
}

export default UploadPage;