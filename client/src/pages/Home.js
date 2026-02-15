import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="content">
          <h1>Empowering Citizen Voices</h1>
          <br /><br />
          <div className="button-container">
            <Link to="/complaints" className="complaint-button">Make a Complaint</Link>
            <Link to="/suggestions" className="suggestion-button">Make a Suggestion</Link>
          </div>
          <div className="description">
            <h2>Welcome to Our Platform !</h2>
            <p>
              At <strong>Empowering Citizen Voices</strong>, we believe that every voice matters. Our platform is designed
              to help you raise concerns, share ideas, and contribute to the betterment of your community.
            </p>
            <div className="features">
              <div className="feature-item">
                <span className="feature-icon">📢</span>
                <h3>Make a Complaint</h3>
                <p>
                  Report issues in public services such as transportation, healthcare, or education.
                </p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💡</span>
                <h3>Make a Suggestion</h3>
                <p>
                  Share your innovative ideas to enhance public services and community initiatives.
                </p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <h3>Track Progress</h3>
                <p>
                  Stay updated on the status of your complaints and suggestions.
                </p>
              </div>
            </div>
            <p className="call-to-action">
              Join us today and be a part of the change.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
