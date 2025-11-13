import Plan from "../models/Plan.js"
export const savePlan = async (req, res, next) =>{
    try {

        const planData = req.body;

        const newPlan = await Plan.create(planData);

        res.status(201).json({
            message: "Plan saved successfully",
            plan: newPlan,
        });
    } catch (err) {
        console.error("Error saving plan:", err);
        res.status(500).json({ error: "Failed to save plan" });
    }
    console.log(JSON.stringify(req.body))
    return next;
}