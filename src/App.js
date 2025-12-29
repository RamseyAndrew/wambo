import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [hearts, setHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState('');
  const [canAccess, setCanAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev, {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 2
      }]);
    }, 800);

    if (isLoggedIn) {
      setTimeout(() => setShowMessage(true), 1000);
    }

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  useEffect(() => {
    const cleanup = setTimeout(() => {
      setHearts(prev => prev.slice(-15));
    }, 100);
    return () => clearTimeout(cleanup);
  }, [hearts]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setUTCHours(22, 10, 0, 0); // 1 AM EAT = 22:00 UTC
      
      if (now.getUTCHours() >= 22 || now.getUTCHours() < 22) {
        if (now >= target) {
          target.setUTCDate(target.getUTCDate() + 1);
        }
      }
      
      const diff = target - now;
      
      if (diff <= 0) {
        setCountdown('Ramsey likes Wambo 💕');
        setCanAccess(true);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!canAccess) {
      setShowModal(true);
      return;
    }
    if (credentials.name === 'Princess' && credentials.password === 'Sorry') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Wrong credentials! 💔');
    }
  };

  return (
    <div className="app">
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            💖
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2>Ima make you wait too ⏰</h2>
          </div>
        </div>
      )}

      {!isLoggedIn ? (
        <div className="glass-card show">
          <h1 className="title bounce">Enter to See My Chwest 💕</h1>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Your special name..."
              value={credentials.name}
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
              className="login-input"
            />
            <input
              type="password"
              placeholder="The magic word..."
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="login-input"
            />
            <button
              type="submit"
              className={`apology-btn ${
                canAccess ? "bounce-hover" : "disabled"
              }`}
            >
              {countdown}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      ) : (
        <div className={`glass-card ${showMessage ? "show" : ""}`}>
          <h1 className="title bounce">I'm So Sorry 💕</h1>
          <p className="message">
            Dear Wambo we just met, but your a christmas miracle I'm sorry again
            ✨for Leaving you on seen wasn't intentional... I was probably just
            staring at my screen, waah io ni uongo I didnt know how to reply to
            you crying thought I did sth wrong , wait I now know I did sth wrong
            😔 wanna be honest, I was just trying make you laugh 😂 trying to
            find the perfect words for someone as amazing as you 🌟 lakini we ni
            nani waah made my whole day a rollercoaster Youre probably still mad
            at me, and I totally get it 😞 you deserve to be heck id be mad at
            me too! But please know it was never my intention to hurt you Sawa
            mum 🥺 🥺 also wdym when you said satisfy me 😅😅
          </p>
          <button className="apology-btn bounce-hover">
            happy now 🥺
          </button>
        </div>
      )}
    </div>
  );
}

export default App;