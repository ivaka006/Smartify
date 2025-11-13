import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Subdocument schema for each daily task
const DailyTaskSchema = new Schema(
    {
        day: {
            type: Number,
            required: true,
            min: 1,
        },
        task_title: {
            type: String,
            required: true,
            trim: true,
        },
        steps: {
            type: [String],
            required: true,
            default: [],
        },
        success_criteria: {
            type: String,
            required: true,
            trim: true,
        },
        done: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
);

// Main schema for the whole plan
const PlanSchema = new Schema(
    {
        topic: {
            type: String,
            required: true,
            trim: true,
        },
        current_level: {
            type: String,
            required: true,
            enum: ["first-timer", "beginner", "intermediate", "advanced"],
        },
        goal_level: {
            type: String,
            required: true,
            enum: ["first-timer", "beginner", "intermediate", "advanced"],
        },
        timeframe_days: {
            type: Number,
            required: true,
            min: 1,
        },
        daily_availability_minutes: {
            type: Number,
            required: true,
            min: 1,
        },
        daily_plan: {
            type: [DailyTaskSchema],
            required: true,
            validate: {
                validator: function (value) {
                    // Optional: ensure number of items matches timeframe_days
                    return Array.isArray(value) && value.length === this.timeframe_days;
                },
                message: "daily_plan length must equal timeframe_days",
            },
        },
        userID: {
            type: String,
            required: true,
            min: 1,
        },
    },
    {
        timestamps: true,
    }
);

const Plan = model("Plan", PlanSchema);

export default Plan;
