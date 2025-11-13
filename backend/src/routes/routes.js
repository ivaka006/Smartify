import express from 'express';
import {getPlan} from '../controllers/getPlan.js';
import authController from '../controllers/authController.js';
const router = express.Router();
// Get all posts

router.post('/getPlan', getPlan);
router.use('/auth', authController); 

export default router;