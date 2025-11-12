import "./Register.css";

function Register() {
  return (
    <section className="register-container">
      <h2>Create an Account</h2>
      <form className="register-form">
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

        <button type="submit" className="btn-register">Register</button>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </section>
  );
}

export default Register;
