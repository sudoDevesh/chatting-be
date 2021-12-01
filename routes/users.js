import express from "express";
const router = express.Router();
import {
  test,
  createUser,
  loginUser,
  getSelfById,
} from "../controllers/users.js";
import verifyToken from "../utils/verifyToken.js";

router.get("/users", test);
router.get("/users/self", verifyToken, getSelfById);
router.post("/users/new", createUser);
router.post("/users/login", loginUser);

export default router;
