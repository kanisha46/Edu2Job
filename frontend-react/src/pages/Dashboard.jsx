import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getUser, apiGet } from '../utils/api';
import { useNavigate } from 'react-router-dom';

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
      // Check resume status
      try {
        const profileRes = await apiGet('/profile/me');
        if (profileRes?.user?.resume_path) {
          setResumeStatus('Uploaded');
        }
      } catch (e) {
        console.warn('Could not fetch profile:', e);
      }

      // Fetch predictions
      let preds = JSON.parse(localStorage.getItem('edu2job_predictions') || '[]');
      try {
        const predRes = await apiGet('/profile/predictions');
        if (predRes?.predictions?.length > 0) {
          preds = predRes.predictions;
          localStorage.setItem('edu2job_predictions', JSON.stringify(preds));
        }
      } catch (e) {
        console.warn('Could not fetch predictions:', e);
      }
      setPredictions(preds);

      // Fetch quizzes
      try {
        const quizRes = await apiGet('/quiz/scores');
        if (quizRes?.scores?.length > 0) {
          setQuizzes(quizRes.scores);
        }
      } catch (e) {
        console.warn('Could not fetch quiz scores:', e);
      }
    };

    loadDashboardData();
  }, [user, navigate]);

  return (
    <div className="app-layout">
      <Sidebar activePage="dashboard" variant="dark" />

      <div className="main-content">
        <div className="ai-bg-glow"></div>
        <header className="main-header">
          <h2>Dashboard</h2>
          <div className="header-actions">
            <button className="notification-btn">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="header-avatar" id="headerAvatar">
              {user?.full_name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        <div className="page-content">
          <div className="dashboard-hero">
            <div className="hero-text">
              <h1>Welcome back 👋</h1>
              <p>Your AI is ready to predict your future career.</p>
            </div>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/prediction')}>Start Prediction</button>
              <button className="btn btn-outline" onClick={() => navigate('/quiz')}>Take Mock Test</button>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><span className="material-symbols-outlined">bar_chart</span></div>
              <div>
                <p className="stat-label">Total Predictions Made</p>
                <p className="stat-value">{predictions.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><span className="material-symbols-outlined">work</span></div>
              <div>
                <p className="stat-label">Most Likely Career Role</p>
                <p className="stat-value-sm">
                  {predictions.length > 0 ? predictions[predictions.length - 1].role : '–'}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><span className="material-symbols-outlined">verified</span></div>
              <div>
                <p className="stat-label">Resume Status</p>
                <div className="status-badge">
                  <p className="stat-value">{resumeStatus}</p>
                  {resumeStatus === 'Uploaded' && <span className="status-dot"></span>}
                </div>
              </div>
            </div>
          </div>

          {/* Empty state / Content area */}
          {predictions.length === 0 && quizzes.length === 0 && (
            <div className="empty-state">
              <span className="material-symbols-outlined">analytics</span>
              <p>Select an option from the sidebar to view details.</p>
            </div>
          )}

          {/* Recent predictions */}
          {predictions.length > 0 && (
            <div id="recentSection" style={{ marginTop: '24px' }}>
              <div className="pred-form-card">
                <h3>Recent Predictions</h3>
                <div>
                  {predictions.slice(-5).reverse().map((p, i) => (
                    <div className="result-card" key={i}>
                      <div className="result-card-inner">
                        <div className="result-role-info">
                          <div className="result-role-icon"><span className="material-symbols-outlined">work</span></div>
                          <div>
                            <div className="result-role-name">{p.role}</div>
                            <div className="result-role-cat">{p.date}</div>
                          </div>
                        </div>
                        <div className="result-bar-container">
                          <div className="result-bar">
                            <div className="result-bar-fill" style={{ width: `${p.confidence}%` }}></div>
                          </div>
                          <span className="result-percent">{p.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Mock Tests */}
          {quizzes.length > 0 && (
            <div id="quizSection" style={{ marginTop: '24px' }}>
              <div className="pred-form-card">
                <h3>Recent Mock Tests</h3>
                <div>
                  {quizzes.slice(-5).reverse().map((s, i) => (
                    <div className="result-card" key={i}>
                      <div className="result-card-inner">
                        <div className="result-role-info">
                          <div className="result-role-icon"><span className="material-symbols-outlined">quiz</span></div>
                          <div>
                            <div className="result-role-name">{s.subject} Test</div>
                            <div className="result-role-cat">{s.date}</div>
                          </div>
                        </div>
                        <div className="result-bar-container">
                          <div className="result-bar">
                            <div className="result-bar-fill" style={{ width: `${(s.score / 15) * 100}%` }}></div>
                          </div>
                          <span className="result-percent">{s.score}/15</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
