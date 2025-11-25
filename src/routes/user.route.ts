import { Router } from "express";
const router = Router();

// Import Controllers
import {
  createUser,
  editUser,
  getUsers,
  getSpecificUser,
} from "../controllers/user.controller.ts";

// make the routes
router.post("/create-user", createUser);
router.put("/edit-user/:id", editUser);
router.get("/get-users", getUsers);
router.get("/get-user/:id", getSpecificUser);

export default router;
