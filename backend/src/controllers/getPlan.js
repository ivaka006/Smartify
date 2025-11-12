// Basic, non-streaming
export const getPlan = async (req, res, next) => {

    const systemPrompt = `
You are Autonomy Coach. Produce a strict, end-to-end plan with exactly one task per day for the entire timeframe.

Output VALID JSON ONLY with these keys:
{
  "topic": string,
  "current_level": "first-timer | "beginner" | "intermediate" | "advanced",
  "goal_level": "beginner" | "intermediate" | "advanced",
  "timeframe_days": number,
  "daily_availability_minutes": number,
  "daily_plan": [
    { "day": number, "task_title": string, "steps": string[], "success_criteria": string, "done": boolean }
  ]
}
RULES:
- user should be able to go from current_level to goal_level in given timeframe
- tasks should go day by day from the current_level difficulty to goal_level difficulty
- if exactly one of timeframe_days or daily_availability_minutes will be null. Determine the missing one based on the provided value and the level (choose a reasonable value). Do not change the value that was provided.
- if both timeframe_days and daily_availability_minutes are filled make the plan based on them
- Personalize the plan using user_preferences when present (e.g., prefer videos, reading, drills), while using only free/low-cost resources.
- daily_plan MUST have exactly timeframe_days items with day = 1..N in order.
- Each day MUST include "done": false (we store it in DB).
- Steps must be concise, actionable, and fit within daily_availability_minutes.
- Use only free/low-cost resources (e.g., lichess.org, YouTube). Mention resources in the step text; do NOT add extra fields.
- Links must not be paywalled.
- No markdown, no explanations—return JSON only.
- Return ONLY JASON with keys: topic, level, timeframe_days, daily_availability_minutes, daily_plan.

`.trim();
    const userPrompt = `
Topic: ${req.body.topic}
Current-level: ${req.body.current_level}
Goal-level: ${req.body.goal_level}
Timeframe: ${req.body.timeframe}
Daily availability: ${req.body.dailyAvailability}
Specific user preferences: ${req.body.userPreference}


`.trim();

    const model = "llama-3.3-70b-versatile";

    try {
        const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                stream: false,
                response_format: { type: "json_object" },
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ]
            })
        });

        // Surface upstream errors clearly
        if (!resp.ok) {
            const detail = await resp.text().catch(() => "");
            return res.status(resp.status).json({ ok: false, error: `groq_${resp.status}`, detail });
        }

        const provider = await resp.json();
        const text = provider?.choices?.[0]?.message?.content ?? "";

        if (!text || typeof text !== "string") {
            return res.status(502).json({ ok: false, error: "empty_model_output" });
        }

        // Parse the JSON the model returned and send only that object
        try {
            const plan = JSON.parse(text);
            return res.status(200).json(plan);
        } catch {
            return res.status(502).json({
                ok: false,
                error: "invalid_json_from_model",
                detail: "Model did not return a valid JSON object.",
                text
            });
        }
    } catch (err) {
        return res.status(500).json({ ok: false, error: "proxy_error", detail: String(err?.message || err) });
    }
};