import { useState } from "react";
import "./UserForm.css";

const LEVELS = ["Beginner", "Intermediate", "Advanced"]; // enum options

function UserForm({ onSubmit }) {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState(LEVELS[0]);
  const [minutesPerDay, setMinutesPerDay] = useState(30);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!skill.trim()) e.skill = "Please enter a skill.";
    if (!LEVELS.includes(level)) e.level = "Invalid level.";
    const num = Number(minutesPerDay);
    if (!Number.isFinite(num) || num <= 0) e.minutesPerDay = "Enter minutes > 0.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = {
      skill: skill.trim(),
      level,
      minutesPerDay: Number(minutesPerDay),
      createdAt: new Date().toISOString(),
    };

    // Optional: pass up to parent or save locally
    if (onSubmit) onSubmit(payload);
    // Simple demo: store in localStorage
    const saved = JSON.parse(localStorage.getItem("plans") || "[]");
    localStorage.setItem("plans", JSON.stringify([...saved, payload]));

    // Reset
    setSkill("");
    setLevel(LEVELS[0]);
    setMinutesPerDay(30);
    alert("Plan saved!");
  };

  return (
    <section className="skill-form__wrapper">
      <h2>Create Learning Plan</h2>
      <form className="skill-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="skill">Skill to learn</label>
          <input
            id="skill"
            type="text"
            placeholder="e.g., React, Python, Guitar"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          {errors.skill && <p className="error">{errors.skill}</p>}
        </div>

        <div className="field">
          <label htmlFor="level">Level</label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.level && <p className="error">{errors.level}</p>}
        </div>

        <div className="field">
          <label htmlFor="minutesPerDay">Time per day (minutes)</label>
            <input type="text" name="timePerDay" placeholder="Enter time spent per day"></input>      
          {errors.minutesPerDay && (
            <p className="error">{errors.minutesPerDay}</p>
          )}
        </div>

        <button type="submit" className="primary">Save Plan</button>
      </form>
    </section>
  );
}

export default UserForm;
