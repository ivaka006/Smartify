import express from 'express';
import {getPlan} from '../controllers/getPlan.js';
const router = express.Router();
// Get all posts
router.get('/', getPlan);


export default router;