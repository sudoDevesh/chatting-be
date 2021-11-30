import express from "express";
const router = express.Router();
import { test, createUser, loginUser } from "../controllers/users.js";

router.get("/users", test);
router.post("/users/new", createUser);
router.post("/users/login", loginUser);

export default router;
