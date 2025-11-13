export const savePlan = async (req, res, next) =>{
    const plan = req.body;
    console.log(JSON.stringify(plan));
    res.status(201)
    return next;
}