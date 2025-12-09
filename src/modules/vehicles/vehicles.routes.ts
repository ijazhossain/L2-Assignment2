import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";

const router = Router();
router.post("/vehicles", vehiclesControllers.createVehicle);
router.get("/vehicles", vehiclesControllers.getVehicles);
router.get("/vehicles/:vehicleId", vehiclesControllers.getSingleVehicle);
router.put("/vehicles/:vehicleId", vehiclesControllers.updateVehicle);
router.delete("/vehicles/:vehicleId", vehiclesControllers.deleteVehicle);
export const vehiclesRoutes = router;
