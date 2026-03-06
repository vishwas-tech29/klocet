import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAdmin } from '../context/AdminContext';
import { ProductCard } from '../components/ProductCard';
import { Ticker } from '../components/Ticker';
import { ModelSlider } from '../components/ModelSlider';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const { getFeaturedProducts, products } = useProducts();
  const { heroContent } = useAdmin();
  const [heroHeadlines, setHeroHeadlines] = useState(['DESIGNED', 'TO', 'DISRUPT']);
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    // Update hero headlines from context
    if (heroContent) {
      setHeroHeadlines([
        heroContent.headline1 || 'DESIGNED',
        heroContent.headline2 || 'TO',
        heroContent.headline3 || 'DISRUPT'
      ]);
    }
  }, [heroContent]);

  useEffect(() => {
    // Trigger hero animation on mount
    setAnimateHero(true);
  }, []);

  const featured = getFeaturedProducts();
  const sortedByNewest = [...products].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 4);

  return (
    <div className="home-page" style={{ marginTop: '96px' }}>
      {/* Model Slider */}
      <ModelSlider />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-column left">
            {heroContent.leftImage ? (
              <img src={heroContent.leftImage} alt="Hero Left" className="hero-image" />
            ) : (
              <div className="hero-placeholder gradient-left"></div>
            )}
          </div>

          <div className="hero-center">
            <div className="hero-text">
              {heroHeadlines.map((headline, idx) => (
                <h1
                  key={idx}
                  className={`hero-headline ${animateHero ? 'animate' : ''}`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {headline}
                </h1>
              ))}
            </div>

            <p className="hero-subtext">{heroContent.subtext}</p>

            <button 
              className="cta-button"
              onClick={() => navigate('/catalog')}
            >
              {heroContent.ctaText || 'SHOP NOW'}
            </button>
          </div>

          <div className="hero-column right">
            {heroContent.rightImage ? (
              <img src={heroContent.rightImage} alt="Hero Right" className="hero-image" />
            ) : (
              <div className="hero-placeholder gradient-right"></div>
            )}
          </div>
        </div>
      </section>

      {/* Designed to Disrupt Section */}
      <section className="designed-section">
        <div className="container">
          <h2 className="section-heading">DESIGNED TO DISRUPT</h2>
          <p className="section-subtext">
            Pushing boundaries. Challenging norms. Redefining what streetwear means.
          </p>

          <div className="grid-4">
            {(featured.length > 0 ? featured : sortedByNewest).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      {/* Our Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="grid-2">
            <div className="mission-text">
              <h2>OUR MISSION</h2>
              <p>
                We believe in fashion that speaks louder than words. NEVERMIND is more than a brand—
                it's a movement for those who refuse to fit into molds. We design pieces that challenge, 
                inspire, and empower the unconventional.
              </p>
              <button className="learn-more-btn">LEARN MORE</button>
            </div>
            <div className="mission-image">
              {heroContent.missionImage ? (
                <img src={heroContent.missionImage} alt="Mission" />
              ) : (
                <div className="placeholder-large"></div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="vision-section">
        <div className="container">
          <div className="grid-2 reversed">
            <div className="vision-image">
              {heroContent.visionImage ? (
                <img src={heroContent.visionImage} alt="Vision" />
              ) : (
                <div className="placeholder-large"></div>
              )}
            </div>
            <div className="vision-text">
              <h2>OUR VISION</h2>
              <p>
                To be the beacon for authentic self-expression. We create spaces where individuality 
                is celebrated, where the bold thrive, and where every piece tells a story of rebellion, 
                elegance, and purpose.
              </p>
              <button className="learn-more-btn">LEARN MORE</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
