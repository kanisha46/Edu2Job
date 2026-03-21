import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="animated-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="hero-content">
          <h1>Predict Your <br/><span>Dream Career</span> with AI</h1>
          <p>Our machine-learning engine analyzes your education, skills, and experience to recommend the best-fit job roles — with confidence scores and actionable insights.</p>
          <div className="hero-buttons">
            <Link to="/signup" className="hero-btn hero-btn-primary">Get Started Free →</Link>
            <Link to="/login" className="hero-btn hero-btn-outline">Log In</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <h2 className="section-title">Why Edu2Job?</h2>
        <p className="section-subtitle">Powered by real ML models trained on career data to give you accurate, explainable predictions.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon purple"><span className="material-symbols-outlined">psychology</span></div>
            <h3>AI-Powered Predictions</h3>
            <p>Random Forest, Logistic Regression & Decision Tree models compete — only the best predicts your career.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon blue"><span className="material-symbols-outlined">trending_up</span></div>
            <h3>Skill Gap Analysis</h3>
            <p>Discover which skills to learn next based on your target role and current profile.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon green"><span className="material-symbols-outlined">insights</span></div>
            <h3>Career Insights</h3>
            <p>Visual charts and explanations show exactly why each role was recommended.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Three simple steps to your career roadmap.</p>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Enter your education, GPA, skills, and experience.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Upload Resume</h3>
            <p>Upload your resume for deeper analysis.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Predictions</h3>
            <p>Receive top-3 job matches with confidence scores and explanations.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Discover Your Future?</h2>
        <p>Join thousands of students using AI to plan their careers.</p>
        <Link to="/signup" className="hero-btn hero-btn-primary">Create Free Account →</Link>
      </section>

      <Footer />
    </div>
  );
};

export default Home;