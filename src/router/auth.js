import express from 'express';
import { signup, singin } from '../controller/auth';

const router = express.Router();
    router.post('/signup',signup)
    router.post('/signin',singin );

export default router;