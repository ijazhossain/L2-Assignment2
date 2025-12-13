import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.services";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehiclesIntoDB(req.body);
    // console.log(result);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Vehicle does dot create!",
      errors: err,
    });
  }
};
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getVehiclesFromDB();
    // console.log(result.rows);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicles not found",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Vehicles data do not found!!",
      errors: err,
    });
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getVehicleFromDB(
      req.params.vehicleId as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
        data: {},
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Vehicle data do not found!!",
      errors: err,
    });
  }
};
const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.updateVehicleIntoDB(
      req.body,
      req.params.vehicleId as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
        data: {},
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Vehicle updated failed!!",
      errors: err,
    });
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.deleteVehicleFromDB(
      req.params.vehicleId as string
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
        data: {},
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Vehicle deletion failed!!",
      errors: err,
    });
  }
};
export const vehiclesControllers = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
