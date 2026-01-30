import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './About.css';
import team1 from '../assests/team1.jpg';
import team2 from '../assests/team2.jpg';
import team3 from '../assests/team3.jpg';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h1>About Empowering Citizen Voices</h1>
          <p className="about-description">
            Empowering Citizen Voices is a platform designed to bridge the gap between citizens and public service providers.
            Our mission is to create a transparent, efficient, and responsive system where every voice is heard and every
            concern is addressed. Whether you have a complaint or a suggestion, we are here to ensure your feedback
            drives meaningful change.
          </p>

          <div className="about-features">
            <div className="feature-card">
              <h2>Our Mission</h2>
              <p>
                To empower citizens by providing a platform where they can voice their concerns and suggestions, fostering
                a culture of accountability and continuous improvement in public services.
              </p>
            </div>
            <div className="feature-card">
              <h2>Our Vision</h2>
              <p>
                A society where every citizen actively participates in shaping public services, leading to a more
                inclusive and responsive community.
              </p>
            </div>
            <div className="feature-card">
              <h2>Our Values</h2>
              <ul>
                <li>Transparency</li>
                <li>Accountability</li>
                <li>Inclusivity</li>
                <li>Innovation</li>
              </ul>
            </div>
          </div>

          <div className="about-team">
            <h2>Meet Our Team</h2>
            <div className="team-members">
              <div className="team-member">
                <img src={team1} alt="Team Member 1" />
                <h3>Pasan Liyanage</h3>
                <p>Founder &amp; CEO</p>
              </div>
              <div className="team-member">
                <img src={team2} alt="Team Member 2" />
                <h3>Gagani Weerakkodi</h3>
                <p>Lead Developer</p>
              </div>
              <div className="team-member">
                <img src={team3} alt="Team Member 3" />
                <h3>Lal Liyanage</h3>
                <p>Community Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
