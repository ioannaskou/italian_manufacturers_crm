import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (auth) {
      auth.logout();
      navigate('/login');
    }
  };

  return (
    <nav>
      <ul>
        <li><strong>CRM</strong></li>
      </ul>
      <ul>
        <li><NavLink to="/manufacturers">Manufacturers</NavLink></li>
        <li><NavLink to="/customers">Customers</NavLink></li>
        <li><NavLink to="/product-categories">Product Categories</NavLink></li>
        <li><NavLink to="/customer-manufacturer-relations">Customer Relations</NavLink></li>
        <li><NavLink to="/manufacturer-product-category-relations">Category Relations</NavLink></li>
        <li><button className="secondary" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
