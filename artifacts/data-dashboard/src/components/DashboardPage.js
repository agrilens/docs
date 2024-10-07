import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function DashboardPage() {
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    const storedAnalyses = JSON.parse(localStorage.getItem('plantAnalyses') || '[]');
    setAnalyses(storedAnalyses);
  }, []);

  if (analyses.length === 0) {
    return <div>No analysis data available. Please upload and analyze some images first.</div>;
  }

  const averageHealthScore = analyses.reduce((sum, analysis) => sum + analysis.health_score, 0) / analyses.length;

  const healthDistribution = analyses.reduce((acc, analysis) => {
    const category = getHealthCategory(analysis.health_score);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const healthDistributionData = Object.entries(healthDistribution).map(([category, count]) => ({
    name: category,
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h1>Plant Health Dashboard</h1>
      
      <h2>Average Health Score</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={[{ name: 'Average Health', score: averageHealthScore }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Health Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={healthDistributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {healthDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <h2>Recent Analyses</h2>
      <ul>
        {analyses.slice(-5).reverse().map((analysis) => (
          <li key={analysis.id}>
            {analysis.fileName}: Health Score - {analysis.health_score}
          </li>
        ))}
      </ul>
    </div>
  );
}

function getHealthCategory(score) {
  if (score >= 80) return 'Healthy';
  if (score >= 60) return 'Mild Issues';
  if (score >= 40) return 'Moderate Issues';
  return 'Severe Issues';
}

export default DashboardPage;