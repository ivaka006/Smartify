import Plan from "../models/Plan.js"
export const loadPlan = async (req, res) => {
    try {
        const userId = req.body.userId;  // or req.query / req.user, depending on your setup
        console.log(userId)
        // Make sure the field name here matches your schema (userId vs userID!)
        const plans = await Plan.find({ userId }).lean();
        console.log(plans)
        return res.status(200).json(plans);
    } catch (err) {
        console.log("no")
        console.error("Error fetching plans by userId:", err);
        return res.status(500).json({ error: "Failed to fetch plans" });
    };
};