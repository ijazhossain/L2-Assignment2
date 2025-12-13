import { Router } from "express";
import { usersControllers } from "./users.controllers";
import auth from "../../middlewares/auth";
const router = Router();
router.get("/users",auth('admin'), usersControllers.getUsers);
router.put("/users/:userId",auth('admin','customer'), usersControllers.updateUser);
router.delete("/users/:userId",auth('admin'),  usersControllers.deleteUser);
export const usersRoutes = router;
