import React from 'react';
import { Play, Brain } from 'lucide-react';
import './Home.css'; 

const Home = ({ onStart }) => {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        {/* Logo ve Başlık */}
        <div className="home-logo-block">
          <div className="home-logo-icon">
            <Brain className="home-logo-brain" />
          </div>
          <h1 className="home-title">
            Quiz
            <span className="home-title-gradient">Fit</span>
          </h1>
          <div className="home-title-divider"></div>
        </div>

        {/* Açıklama */}
        <div className="home-description">
          <p className="home-text-light">
            Sağlık ve beslenme bilgini test etmeye hazır mısın?
          </p>
          <p className="home-text-strong">
            Kendini dene, yeni şeyler öğren!
          </p>
        </div>

        {/* Buton */}
        <div className="home-button-block">
          <button onClick={onStart} className="home-start-button">
            <Play className="home-button-icon" />
            Quiz'e Başla
          </button>
        </div>

        {/* Alt bilgi */}
        <p className="home-footer-text">
          Hazırsan, hemen başlayalım
        </p>
      </div>

      {/* Arka plan dekorları */}
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
    </div>
  );
};

export default Home;
