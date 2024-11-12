// App.js
import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AllocateAsset from './components/AllocateAsset/AllocateAsset';
import AuditHistory from './components/AuditHistory/AuditHistory';
import Dashboard from './components/Dashboard/Dashboard';
import EditAsset from './components/EditAsset';
import { LogAsset } from './components/LogAsset/LogAsset';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProcureAsset from './components/ProcureAsset/ProcureAsset';
import { AssetProvider } from './context/AssetContext';
import { AuthContext, AuthProvider } from './context/AuthContext';
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
          <Route path="/log-history" element={<LogAsset/>} />
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
