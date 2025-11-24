import { Router } from "express";
const router = Router();

// Import Controllers
import { createUser } from "../controllers/user.controller.ts";
import { editUser } from "../controllers/user.controller.ts";
import { getUsers } from "../controllers/user.controller.ts";

// make the routes
router.post("/create_user", createUser);
router.put("/edit_user/:id", editUser);
router.get("/get_users", getUsers);

export default router;
