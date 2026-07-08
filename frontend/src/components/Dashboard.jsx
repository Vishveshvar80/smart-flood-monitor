import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_BASE_URL = 'http://localhost:5000';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [latestStatus, setLatestStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataRes, compRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/get-data`),
          axios.get(`${API_BASE_URL}/compare-latest`)
        ]);

        setData(dataRes.data);
        setComparison(compRes.data);
        
        if (dataRes.data.length > 0) {
          setLatestStatus(dataRes.data[dataRes.data.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Prepare chart data
  const timestamps = data.map(d => {
    const date = new Date(d.timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  });

  // Chart 1: Comparison Chart (Historical Avg vs Current Values)
  const comparisonData = {
    labels: ['Water', 'Rain', 'Humidity', 'Soil'],
    datasets: [
      {
        label: 'Historical Avg',
        data: comparison ? [
          comparison.historical_avg.water_level,
          comparison.historical_avg.rainfall,
          comparison.historical_avg.humidity,
          comparison.historical_avg.soil_moisture
        ] : [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 4
      },
      {
        label: 'Current Values',
        data: comparison ? [
          comparison.current.water_level,
          comparison.current.rainfall,
          comparison.current.humidity,
          comparison.current.soil_moisture
        ] : [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        borderRadius: 4
      }
    ]
  };

  // Chart 2: Rainfall vs Water Level
  const rainVsWaterData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Rainfall',
        data: data.map(d => d.rainfall),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        yAxisID: 'y',
        tension: 0.4
      },
      {
        label: 'Water Level',
        data: data.map(d => d.water_level),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y1',
        tension: 0.4
      }
    ]
  };

  // Chart 3: Water Level (Live)
  const waterLevelData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Live Water Level',
        data: data.map(d => d.water_level),
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Chart 4: Rainfall vs Temperature
  const rainTempData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Rainfall',
        data: data.map(d => d.rainfall),
        borderColor: 'rgb(56, 189, 248)',
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        tension: 0.4
      },
      {
        label: 'Temperature (°C)',
        data: data.map(d => d.temperature || 25),
        borderColor: 'rgb(244, 63, 94)',
        backgroundColor: 'rgba(244, 63, 94, 0.2)',
        tension: 0.4
      }
    ]
  };

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#e2e8f0', font: { family: 'Inter' } } },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  const rainVsWaterOptions = {
    ...commonOptions,
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { type: 'linear', display: true, position: 'left', ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#94a3b8' } },
    }
  };

  const isDanger = latestStatus?.prediction === 'DANGER';

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>IoT Flood Monitoring & Prediction</h1>
          <p className="subtitle">Real-time Environmental Visualization</p>
        </div>
        <div className="status-indicators">
          <div className={`status-badge ${isDanger ? 'danger' : 'safe'}`}>
            <span className="dot"></span>
            Status: {latestStatus ? latestStatus.prediction : 'LOADING...'}
          </div>
        </div>
      </header>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Current vs Historical Avg</h2>
          <div className="chart-wrapper">
            <Bar data={comparisonData} options={commonOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h2>Rainfall vs Water Level</h2>
          <div className="chart-wrapper">
            <Line data={rainVsWaterData} options={rainVsWaterOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h2>Live Water Level</h2>
          <div className="chart-wrapper">
            <Line data={waterLevelData} options={commonOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h2>Rainfall vs Temperature</h2>
          <div className="chart-wrapper">
            <Line data={rainTempData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
