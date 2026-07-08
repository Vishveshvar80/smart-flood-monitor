import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">FloodGuard</div>
        <div className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            SMS Alerts Setup
          </button>
        </div>
      </nav>
      
      <main className="main-content">
        {activeTab === 'dashboard' ? <Dashboard /> : <Contacts />}
      </main>
    </div>
  );
}

export default App;
