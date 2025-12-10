import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";

const router = Router();
router.post("/bookings", bookingsControllers.createVehicle);
router.get("/bookings", bookingsControllers.getBookings);

export const bookingsRoutes = router;