import "./Login.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

function Login({setId}) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formEl = e.currentTarget;   // save form
    const form = new FormData(formEl);
    const body = {
      email: form.get("email").trim(),
      password: form.get("password"),
    };

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed for httpOnly cookie
        body: JSON.stringify(body),
      });

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json")
        ? await res.json()
        : { error: "Unexpected server response" };

      if (!res.ok) {
        throw new Error(data.error || "Invalid login");
      }

      // Save user in context so navbar updates immediately
      setUser(data.user);
      setId(data.user._id);
      navigate("/preview")
      formEl.reset();
      navigate("/"); // redirect after login
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-container">
      <h2>Login</h2>

      {error && (
        <p style={{ color: "#c62828", marginBottom: "1rem" }}>{error}</p>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="register-link">
          Don’t have an account?{" "}
          <NavLink to="/register">Register here</NavLink>
        </p>
      </form>
    </section>
  );
}

export default Login;
