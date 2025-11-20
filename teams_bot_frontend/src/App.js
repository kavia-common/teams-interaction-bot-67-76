import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Determine default compact mode from env (default ON)
const envCompact = typeof process !== 'undefined' && process.env && process.env.REACT_APP_COMPACT_MODE;
const defaultCompact = envCompact === 'off' || envCompact === 'false' ? 'off' : 'on';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [compact, setCompact] = useState(defaultCompact);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Apply compact mode on root as attribute for CSS tokens
  useEffect(() => {
    document.documentElement.setAttribute('data-compact', compact);
  }, [compact]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const toggleCompact = () => {
    setCompact(prev => (prev === 'on' ? 'off' : 'on'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', width: '100%'}}>
            <strong style={{fontSize: 'var(--font-size-lg)'}}>Teams Bot Console</strong>
            <div style={{display:'flex', gap: 'var(--toolbar-gap)'}}>
              <button
                className="btn"
                onClick={toggleCompact}
                aria-label={`Toggle compact mode`}
                title="Toggle compact mode"
              >
                {compact === 'on' ? 'Compact: On' : 'Compact: Off'}
              </button>
              <button 
                className="theme-toggle" 
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <div className="container" style={{maxWidth:'720px'}}>
          <div className="card">
            <h2>Compact Theme</h2>
            <p>
              The UI uses compact tokens for spacing and typography while preserving the Ocean Professional palette.
            </p>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-4)', marginTop:'var(--space-4)'}}>
              <div>
                <label className="h3" htmlFor="ex1">Sample input</label>
                <input id="ex1" className="input" placeholder="Type here" />
              </div>
              <div>
                <label className="h3" htmlFor="ex2">Another input</label>
                <input id="ex2" className="input" placeholder="Type here" />
              </div>
            </div>
            <div style={{marginTop:'var(--space-5)'}}>
              <button className="btn">Primary Action</button>
            </div>
          </div>

          <div className="card">
            <h2>Table (Compact)</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Column A</th>
                  <th>Column B</th>
                  <th>Column C</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item 1</td>
                  <td>Detail</td>
                  <td>Status</td>
                </tr>
                <tr>
                  <td>Item 2</td>
                  <td>Detail</td>
                  <td>Status</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{marginTop:'var(--space-5)'}}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
