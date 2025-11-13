import "./Register.css";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use .env in frontend: VITE_API_URL=http://localhost:8000
  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

 async function handleSubmit(e) {
  e.preventDefault();
  setError(null);

  // ✅ Keep a stable reference to the form element
  const formEl = e.currentTarget;

  const form = new FormData(formEl);
  const body = {
    username: form.get("name")?.trim(),
    email: form.get("email")?.trim(),
    password: form.get("password") || "",
    rePassword: form.get("confirmPassword") || "",
  };

  if (body.password !== body.rePassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? await res.json() : null;

    if (!res.ok) {
      const msg = data?.message || data?.error || `Registration failed (${res.status}).`;
      throw new Error(msg);
    }

    // ✅ Use the saved element (not e.currentTarget)
    formEl.reset();
    navigate("/");
  } catch (err) {
    setError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
}


  return (
    <section className="register-container">
      <h2>Create an Account</h2>

      {error && (
        <p style={{ color: "#c62828", marginBottom: "1rem" }}>{error}</p>
      )}

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
            minLength={6}
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
            minLength={6}
          />
        </div>

        <button type="submit" className="btn-register" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="login-link" style={{ marginTop: "0.75rem" }}>
          Already have an account?{" "}
          <NavLink
            to="/login"
            style={{ color: "#61dafb", textDecoration: "none" }}
          >
            Login here
          </NavLink>
        </p>
      </form>
    </section>
  );
}
