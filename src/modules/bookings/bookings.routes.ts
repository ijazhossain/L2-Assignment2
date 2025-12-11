import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";
import auth from "../../middlewares/auth";

const router = Router();
router.post("/bookings", bookingsControllers.createVehicle);
router.get(
  "/bookings",
  auth("admin", "customer"),
  bookingsControllers.getBookings
);

export const bookingsRoutes = router;
