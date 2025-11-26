import { Router } from "express";
const router = Router();
import authorization from "../middlewares/authorization.middleware.ts";
// Import Controllers
import {
  signUp,
  logIn,
  editUser,
  getUsers,
  getSpecificUser,
} from "../controllers/user.controller.ts";

// make the routes
router.post("/signup", signUp);
router.post("/login", logIn);
router.put("/edit-user/:id", authorization, editUser);
router.get("/get-users", authorization, getUsers);
router.get("/get-user/:id", authorization, getSpecificUser);

export default router;
