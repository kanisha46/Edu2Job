import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getUser, apiGet } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [resumeStatus, setResumeStatus] = useState('Pending');
  const [predictions, setPredictions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadDashboardData = async () => {
      try {
        const profileRes = await apiGet('/profile/me');
        if (profileRes?.user?.resume_path) setResumeStatus('Uploaded');
      } catch {}

      let preds = JSON.parse(localStorage.getItem('edu2job_predictions') || '[]');
      try {
        const predRes = await apiGet('/profile/predictions');
        if (predRes?.predictions?.length > 0) {
          preds = predRes.predictions;
        }
      } catch {}
      setPredictions(preds);

      try {
        const quizRes = await apiGet('/quiz/scores');
        if (quizRes?.scores?.length > 0) setQuizzes(quizRes.scores);
      } catch {}
    };

    loadDashboardData();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar activePage="dashboard" variant="dark" />

      <div className="main-content">
        {/* HEADER */}
        <header className="main-header">
          <h2>Dashboard</h2>

          <div className="header-actions">
            <button className="notification-btn">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="header-avatar">
              {user?.full_name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* HERO */}
        <div className="premium-hero">
          <div>
            <h1>Welcome back 👋</h1>
            <p>AI-powered career insights are ready for you.</p>
          </div>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/prediction')}>
              Start Prediction
            </button>
            <button className="btn btn-glass" onClick={() => navigate('/quiz')}>
              Take Mock Test
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="premium-stats">
          <div className="premium-card">
            <span className="material-symbols-outlined icon">bar_chart</span>
            <p>Total Predictions</p>
            <h2>{predictions.length}</h2>
          </div>

          <div className="premium-card">
            <span className="material-symbols-outlined icon">work</span>
            <p>Top Role</p>
            <h2>
              {predictions.length > 0
                ? predictions[predictions.length - 1].role
                : '--'}
            </h2>
          </div>

          <div className="premium-card">
            <span className="material-symbols-outlined icon">verified</span>
            <p>Resume Status</p>
            <h2 className={resumeStatus === 'Uploaded' ? 'success' : 'pending'}>
              {resumeStatus}
            </h2>
          </div>
        </div>

        {/* PREDICTIONS */}
        {predictions.length > 0 && (
          <div className="section" style={{ marginTop: "20px" }}>
            <h3>Recent Predictions</h3>

            {predictions.slice(-5).reverse().map((p, i) => (
              <div className="premium-result" key={i}>
                <div className="left">
                  <span className="material-symbols-outlined">work</span>
                  <div>
                    <h4>{p.role}</h4>
                    <p>{p.date}</p>
                  </div>
                </div>

                <div className="right">
                  <div className="progress">
                    <div style={{ width: `${p.confidence}%` }}></div>
                  </div>
                  <span>{p.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QUIZ */}
        {quizzes.length > 0 && (
          <div className="section" style={{ marginTop: "20px" }}>
            <h3>Recent Tests</h3>

            {quizzes.slice(-5).reverse().map((q, i) => (
              <div className="premium-result" key={i}>
                <div className="left">
                  <span className="material-symbols-outlined">quiz</span>
                  <div>
                    <h4>{q.subject}</h4>
                    <p>{q.date}</p>
                  </div>
                </div>

                <div className="right">
                  <div className="progress">
                    <div style={{ width: `${(q.score / 15) * 100}%` }}></div>
                  </div>
                  <span>{q.score}/15</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;