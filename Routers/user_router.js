//Importing express to access Router
import express from "express";

//Importing all necessary controller methods
import { createPortfolio, deletePortfolio, forgotPassword, getUserHome, getUserPortfolio, loginUser, registerUser, resetPassword, saveContactPersonInfo, serverConnect, updatePortfolio } from "../Controllers/user_controller.js";
//Authentication for reset password
import { resetAuthMiddleware } from "../Middlewares/reset_password_auth_middleware.js";
//Authentication for user routings
import { userAuthMiddleware } from "../Middlewares/user_auth_middleware.js";

//creating router
const router = express.Router();

//basic endpoint for server connection
router.get('/', serverConnect);

//all login and logout endpoints
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', resetAuthMiddleware , resetPassword);


//CRUD operation endpoint for portfolio
router.get('/user-data', userAuthMiddleware, getUserHome );
router.post('/:userName/createPortfolio', userAuthMiddleware, createPortfolio );
router.put('/:userName/updatePortfolio', userAuthMiddleware, updatePortfolio );
router.delete('/:userName/deletePortfolio', userAuthMiddleware, deletePortfolio );
router.get('/portfolio-data', userAuthMiddleware, getUserPortfolio );
router.post('/:userName/contact', userAuthMiddleware, saveContactPersonInfo);

//exporting the router
export default router;