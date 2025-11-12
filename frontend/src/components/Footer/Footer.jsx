import './Footer.css';
import { NavLink } from "react-router-dom";

function Footer() {

  return (
    <footer className="footer">
      <p>© 2025 MyCourses. All rights reserved.</p>
      <ul className="footer-links">
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
    </footer>
  );
}

export default Footer;
