import "./Header.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

const courses = ["Chess", "React", "Biking"];

function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <h2 className="logo">
        Smartify {user ? <span className="user-tag">| User: {user.username}</span> : ""}
      </h2>
      <nav>
        <ul className="nav-links">
          <li className="dropdown">
            <label htmlFor="course-adding">Courses</label>
            <select name="courses" id="course-adding">
              <option value="">Courses ↓</option>
              {courses.map((course) => (
                <option key={course} value={course.toLowerCase()}>
                  {course}
                </option>
              ))}
            </select>
          </li>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/logout">Logout</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
