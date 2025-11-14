import React from "react";
import "./Preview.css";
import {useNavigate} from "react-router-dom";

const PlanPage = ({ plan, id }) => {
    const navigate = useNavigate();

    const saveFunction = async () => {
        if (!plan) return;
        if ( id== null ){
            navigate("/login")
            console.log("User not logged in")
            return;
        }
        const newPlan = { ...plan, userId: id }; // note: userID if your schema expects that!
        try {
            const res = await fetch("http://localhost:8000/api/savePlan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPlan),
            });

            if (!res.ok) {
                console.error("Failed to save plan");
            } else {
                console.log("Plan saved successfully");
            }
        } catch (err) {
            console.error("Error saving plan:", err);
        }
    };
    const reworkPlan = async () =>{
        navigate("/")
    }
    if (!plan) {
        return <div className="plan-page">No plan data available.</div>;
    }

    const {
        topic,
        current_level,
        goal_level,
        timeframe_days,
        daily_availability_minutes,
        daily_plan,
    } = plan;

    const formatLabel = (str) =>
        str
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" ");

    return (
        <div className="plan-page">
            {/* Header */}
            <header className="plan-header">
                <div>
                    <h1>{topic}</h1>
                    <p className="plan-subtitle">
                        From <span className="badge badge-level">{formatLabel(current_level)}</span>{" "}
                        to <span className="badge badge-level">{formatLabel(goal_level)}</span>
                    </p>
                </div>

                <div className="plan-summary">
                    <div className="summary-item">
                        <span className="summary-label">Timeframe</span>
                        <span className="summary-value">{timeframe_days} days</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Daily time</span>
                        <span className="summary-value">
                            {daily_availability_minutes} min/day
                        </span>
                    </div>
                </div>

                {/* ✅ Save button */}
                <button className="save-button" onClick={saveFunction}>
                    Save plan
                </button>
                <button className="rework-plan" onClick={reworkPlan}>
                    Rework plan
                </button>
            </header>

            {/* Daily Plan */}
            <section className="daily-plan">
                {daily_plan.map((dayItem) => (
                    <article key={dayItem.day} className="day-card">
                        <header className="day-card-header">
                            <div>
                                <h2>
                                    Day {dayItem.day}: {dayItem.task_title}
                                </h2>
                                <span className="success-criteria-label">
                                    Success criteria:
                                </span>{" "}
                                <span className="success-criteria-text">
                                    {dayItem.success_criteria}
                                </span>
                            </div>
                            <span
                                className={`status-pill ${
                                    dayItem.done ? "status-done" : "status-planned"
                                }`}
                            >
                                {dayItem.done ? "Done" : "Planned"}
                            </span>
                        </header>

                        <ul className="steps-list">
                            {dayItem.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default PlanPage;
