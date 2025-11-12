import "./Register.css";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      username: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      rePassword: form.get("confirmPassword"),
    };

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed for cookies
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Registration failed.");

      e.currentTarget.reset();
      navigate("/"); // redirect after successful register
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="register-container">
      <h2>Create an Account</h2>

      {error && <p style={{ color: "#c62828", marginBottom: "1rem" }}>{error}</p>}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            required
          />
        </div>

        <button type="submit" className="btn-register" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="login-link" style={{ marginTop: "0.75rem" }}>
          Already have an account?{" "}
          <NavLink to="/login" style={{ color: "#61dafb", textDecoration: "none" }}>
            Login here
          </NavLink>
        </p>
      </form>
    </section>
  );
}
