import express from "express";
import authController from "../controller/authController.js"

const router = express.Router();

router
    .get("/auth/login",authController.login)


export default router