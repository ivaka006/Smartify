import "./Login.css";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <section className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="btn-login">Login</button>

        <p className="register-link">
          Don’t have an account? <NavLink to="/register">Register here</NavLink>
        </p>
      </form>
    </section>
  );
}

export default Login;
