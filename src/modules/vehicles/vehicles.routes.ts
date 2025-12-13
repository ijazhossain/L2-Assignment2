import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import auth from "../../middlewares/auth";

const router = Router();
router.post("/vehicles",auth('admin'), vehiclesControllers.createVehicle);
router.get("/vehicles", vehiclesControllers.getVehicles);
router.get("/vehicles/:vehicleId", vehiclesControllers.getSingleVehicle);
router.put("/vehicles/:vehicleId",auth('admin'), vehiclesControllers.updateVehicle);
router.delete("/vehicles/:vehicleId",auth('admin'), vehiclesControllers.deleteVehicle);
export const vehiclesRoutes = router;
