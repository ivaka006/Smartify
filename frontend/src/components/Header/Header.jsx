import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";




function Header({setId, plan}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
      setId(null)
    await logout();        
    navigate("/login");    
  };

  return (
    <header className="header">
      <h2 className="logo">
        Smartify{" "}
        {user ? <span className="user-tag">| User: {user.username}</span> : ""}
      </h2>
      <nav>
        <ul className="nav-links">
    
            <li>
                <NavLink to="/plan-page">Courses</NavLink>
            </li>

          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {/* only show Login / Register if NOT logged in */}
          {!user && (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}

          {/* show Logout button only when logged in */}
          {user && (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
