
export const getPlan = (req, res, next) => {
    const API_KEY = process.env.OPEN_AI_KEY
    res.json(API_KEY)
}