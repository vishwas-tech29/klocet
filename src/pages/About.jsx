import React from 'react';
import { useAdmin } from '../context/AdminContext';
import './About.css';

export const About = () => {
  const { heroContent } = useAdmin();

  return (
    <div className="about-page" style={{ marginTop: '96px' }}>
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>ABOUT KLOCET</h1>
          <p>We're more than a brand—we're a movement for the bold, the brave, and the unconventional.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2>OUR STORY</h2>
            <p>
              KLOCET was born from a simple yet powerful idea: that fashion should challenge, inspire, 
              and empower. In a world of endless trends and fleeting moments, we decided to create something 
              timeless. Something that speaks to those who refuse to fit into molds.
            </p>
            <p>
              Every piece we create is a rebellion against mediocrity. From our lightweight hoodies to 
              our statement streetwear, each item is designed with intention, crafted with precision, 
              and delivered with care. We don't follow trends—we set them.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>OUR VALUES</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>AUTHENTICITY</h3>
              <p>
                We believe in being real. No gimmicks, no shortcuts—just honest design and quality 
                that speaks for itself.
              </p>
            </div>
            <div className="value-card">
              <h3>QUALITY</h3>
              <p>
                Premium materials, meticulous craftsmanship, and an obsession with detail. Every 
                thread matters.
              </p>
            </div>
            <div className="value-card">
              <h3>INDIVIDUALITY</h3>
              <p>
                Your style is your voice. We create pieces that let you express who you are without 
                compromise.
              </p>
            </div>
            <div className="value-card">
              <h3>INTEGRITY</h3>
              <p>
                Sustainable practices, fair treatment of our teams, and a commitment to making 
                fashion responsibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="grid-2">
            <div className="mission-block">
              <h3>MISSION</h3>
              <p>
                To be the beacon for authentic self-expression. We create boundaries-challenging 
                streetwear that empowers individuals to embrace their true selves without apology.
              </p>
            </div>
            <div className="vision-block">
              <h3>VISION</h3>
              <p>
                A world where fashion is a form of rebellion, where individual expression is celebrated, 
                and where elegance never compromises on authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>MEET THE COLLECTIVE</h2>
          <p className="team-intro">
            We're a small but mighty team of designers, makers, and dreamers united by one vision: 
            to disrupt the status quo.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta">
        <div className="container">
          <h2>STAY CONNECTED</h2>
          <p>Follow us for exclusive drops, behind-the-scenes content, and the latest from the KLOCET universe.</p>
          <div className="social-links">
            <a href="#instagram" className="social-btn">INSTAGRAM</a>
            <a href="#email" className="social-btn">EMAIL</a>
            <a href="#discord" className="social-btn">DISCORD</a>
          </div>
        </div>
      </section>
    </div>
  );
};
