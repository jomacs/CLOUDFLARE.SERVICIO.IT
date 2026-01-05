import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Zones from './pages/Zones';
import ZoneDetails from './pages/ZoneDetails';
import DNSRecords from './pages/DNSRecords';
import Analytics from './pages/Analytics';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/zones"
            element={
              <PrivateRoute>
                <Zones />
              </PrivateRoute>
            }
          />
          <Route
            path="/zones/:zoneId"
            element={
              <PrivateRoute>
                <ZoneDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/zones/:zoneId/dns"
            element={
              <PrivateRoute>
                <DNSRecords />
              </PrivateRoute>
            }
          />
          <Route
            path="/zones/:zoneId/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
