import "./UserForm.css";

function UserForm() {

  return (
    <section className="skill-form__wrapper">
      <h2>Create Learning Plan</h2>
      <form className="skill-form">
        <div className="field">
          <label htmlFor="skill">Skill to learn</label>
          <input
            id="skill"
            type="text"
            placeholder="e.g., React, Python, Guitar"
            name="skill"
          />
        </div>

        <div className="field">
          <label htmlFor="level">Level</label>
          <select id="level" name="level">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="duration">Duration</label>
          <input
            id="duration"
            type="text"
            placeholder="14 days"
            name="duration"
          />
        </div>

        <div className="field">
          <label htmlFor="minutesPerDay">Time per day (minutes)</label>
          <input
            id="minutesPerDay"
            type="text"
            name="minutesPerDay"
            placeholder="30, 15, 10, 1h, 1:30 min"
          />
        </div>

        <button type="submit" className="primary">
          Save Plan
        </button>
      </form>
    </section>
  );
}

export default UserForm;
