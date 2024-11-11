// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { AssetProvider } from './context/AssetContext';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import ProcureAsset from './components/ProcureAsset/ProcureAsset';
import AllocateAsset from './components/AllocateAsset/AllocateAsset';
import AuditHistory from './components/AuditHistory/AuditHistory';
import EditAsset from './components/EditAsset';
import Login from './components/Login/Login';
import './styles.css';

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Login />} />
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/procure-asset" element={<ProcureAsset />} />
          <Route path="/allocate-asset" element={<AllocateAsset />} />
          <Route path="/audit-history" element={<AuditHistory />} />
          <Route path="/edit-asset/:assetID" element={<EditAsset />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AssetProvider>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </AssetProvider>
    </AuthProvider>
  );
};

export default App;
