import express from "express";
import { createPortfolio, deletePortfolio, forgotPassword, getUserHome, getUserPortfolio, loginUser, registerUser, resetPassword, updatePortfolio } from "../Controllers/user_controller.js";
import { resetAuthMiddleware } from "../Middlewares/reset_password_auth_middleware.js";
import { userAuthMiddleware } from "../Middlewares/user_auth_middleware.js";


const router = express.Router();

router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', resetAuthMiddleware , resetPassword);

router.get('/home', userAuthMiddleware, getUserHome );
router.post('/:userName/createPortfolio', userAuthMiddleware, createPortfolio );
router.put('/:userName/updatePortfolio', userAuthMiddleware, updatePortfolio );
router.delete('/:userName/deletePortfolio', userAuthMiddleware, deletePortfolio );
router.get('/:userName/portfolio', userAuthMiddleware, getUserPortfolio );

export default router;