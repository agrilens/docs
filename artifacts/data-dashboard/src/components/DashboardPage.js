import React, { useEffect, useState } from 'react';

function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState('');

  useEffect(() => {
    const result = localStorage.getItem('analysisResult');
    if (result) {
      // Directly set the result without parsing
      setAnalysisResult(result);
    }
  }, []);

  if (!analysisResult) {
    return <div>No analysis data available. Please upload an image first.</div>;
  }

  return (
    <div>
      <h1>Plant Health Dashboard</h1>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {analysisResult}
      </pre>
    </div>
  );
}

export default DashboardPage;