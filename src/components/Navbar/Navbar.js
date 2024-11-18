import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';
 
const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
 
  return (
    <nav className="navbar">
     
        <>
          <Link to="/dashboard-page" className="navbar-link">
              <AssignmentIcon className="navbar-icon" />
              Dashboard
            </Link>
          <Link to="/procure-asset" className="navbar-link">
            <BusinessCenterIcon className="navbar-icon" />
            Add Asset
          </Link>
          <Link to="/allocate-asset" className="navbar-link">
            <BusinessCenterIcon className="navbar-icon" />
             Asset Management
          </Link>
          <Link to="/audit-history" className="navbar-link">
            <AssignmentIcon className="navbar-icon" />
            Asset Data
          </Link>
          <Link to="/log-history" className="navbar-link">
            <AssignmentIcon className="navbar-icon" />
            Log History
          </Link>
          
          <button onClick={logout} className="navbar-link navbar-button">
            <ExitToAppIcon className="navbar-icon" />
            Logout
          </button>
        </>
    </nav>
  );
};
 
export default Navbar;