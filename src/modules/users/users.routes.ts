import { Router } from "express";
import { usersControllers } from "./users.controllers";
const router = Router();
router.get("/users", usersControllers.getUsers);
router.put("/users/:userId", usersControllers.updateUser);
router.delete("/users/:userId", usersControllers.deleteUser);
export const usersRoutes = router;
