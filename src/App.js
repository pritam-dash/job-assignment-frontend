import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import Index from './components/Auth/index'
import { UserProvider } from './context/userContext.js';

function App() {

  
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Index/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
