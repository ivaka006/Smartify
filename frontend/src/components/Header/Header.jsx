import "./Header.css";

const courses = ["Chess", "React", "Biking"]

function Header() {


  return (
    <header className="header"> 
      <h2 className="logo">Smartify</h2>
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

          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
