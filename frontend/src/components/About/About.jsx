import "./About.css";

function About() {
  return (
    <section className="about-container">
      <h2>About Smartify</h2>
      <p className="about-text">
        <strong>Smartify</strong> is a personal learning planner that helps you
        organize and stay consistent with your skill development journey. Whether
        you want to learn <em>React</em>, improve your <em>English</em>, or master
        <em> guitar</em> — Smartify creates a custom daily plan tailored to your
        goals and available time.
      </p>

      <p className="about-text">
        Simply choose the skill you want to learn, select your current level, and
        decide how much time you can dedicate each day. Smartify will generate a
        clear, structured plan to help you reach your learning goals step by step.
      </p>

      <p className="about-text">
        Stay motivated, track your progress, and make learning a daily habit — all
        in one simple app.
      </p>

      <div className="about-highlight">
        <p>🎯 <strong>Your goals, your time, your growth — Smartify makes it happen!</strong></p>
      </div>
    </section>
  );
}

export default About;
