// PlanPage.jsx
import React from "react";
import "./PlanPage.css"; // You will get this file below

const PlanPage = ({ plans = [] }) => {
  if (!Array.isArray(plans) || plans.length === 0) {
    return <div className="planpage-empty">No plans available.</div>;
  }

  // Utility: Capitalize things like "first-timer"
  const formatLabel = (str = "") =>
    String(str)
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");

  return (
    <div className="planpage-container">
      {plans.map((plan, index) => {
        const {
          topic,
          current_level,
          goal_level,
          timeframe_days,
          daily_availability_minutes,
          daily_plan = [],
        } = plan;

        return (
          <section key={index} className="planpage-plan">
            {/* =============== PLAN HEADER =============== */}
            <header className="planpage-header">
              <div className="planpage-header-left">
                <h1>{topic}</h1>

                {(current_level || goal_level) && (
                  <div className="planpage-level">
                    {current_level && <span>{formatLabel(current_level)}</span>}
                    {goal_level && (
                      <>
                        <span className="arrow">→</span>
                        <span>{formatLabel(goal_level)}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="planpage-header-right">
                <div className="planpage-pill">
                  <span className="label">Timeframe</span>
                  <span className="value">{timeframe_days} days</span>
                </div>

                <div className="planpage-pill">
                  <span className="label">Daily Time</span>
                  <span className="value">{daily_availability_minutes} min</span>
                </div>
              </div>
            </header>

            {/* =============== DAILY PLAN GRID =============== */}
            <div className="planpage-grid">
              {daily_plan.map((day) => (
                <article key={day.day} className="planpage-card">
                  <header className="planpage-card-header">
                    <h2>
                      Day {day.day}: {day.task_title}
                    </h2>

                    <span
                      className={
                        day.done
                          ? "planpage-status done"
                          : "planpage-status planned"
                      }
                    >
                      {day.done ? "Done" : "Planned"}
                    </span>
                  </header>

                  <p className="planpage-success">
                    <strong>Success Criteria:</strong> {day.success_criteria}
                  </p>

                  <ul className="planpage-steps">
                    {day.steps?.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default PlanPage;
