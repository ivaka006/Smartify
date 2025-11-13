import express from 'express';
import {getPlan} from '../controllers/getPlan.js';
import {savePlan} from "../controllers/savePlan.js";
import authController from '../controllers/authController.js';
const router = express.Router();
// Get all posts

router.post('/getPlan', getPlan);
router.post('/savePlan', savePlan);
router.use('/auth', authController);


export default router;