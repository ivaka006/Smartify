import './Header.css';
import { useState } from 'react';
import { UserForm } from '../UserForm/UserForm.jsx';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

    function addingCourses() {
         
    }
  return (
    <header className="header">
      <h2 className="logo">Smartify</h2>
      <nav>
        <ul className="nav-links">
          <li><a href="/courses">Courses</a></li>
          {!isLoggedIn && (
            <>
              <li><button onClick={handleLogin}>Login</button></li>
              <li><button>Register</button></li>
            </>
          )}
          {isLoggedIn && (
            <li><button onClick={handleLogout}>Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
