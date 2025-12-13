import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";
import auth from "../../middlewares/auth";

const router = Router();
router.post("/bookings",auth('admin','customer'), bookingsControllers.createVehicle);
router.put("/bookings/:bookingId",auth('admin','customer'), bookingsControllers.updateBookings);
router.get(
  "/bookings",
  auth("admin", "customer"),
  bookingsControllers.getBookings
);

export const bookingsRoutes = router;
