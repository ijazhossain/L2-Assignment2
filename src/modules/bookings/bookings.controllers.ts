import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";
import { pool } from "../../config/db";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBookingsIntoDB(req.body);
    // console.log(result.vehicle);

    let data = result.result.rows[0];

    data.rent_start_date = data.rent_start_date.toISOString().split("T")[0];
    data.rent_end_date = data.rent_end_date.toISOString().split("T")[0];
    // console.log(data);
    data.vehicle = result.vehicle;
    res.status(201).json({
      success: true,
      message: "Bookings created successfully",
      data: data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Bookings does dot create!",
      errors: err,
    });
  }
};
const getBookings = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    const data = await bookingsServices.getBookingsFromDB(req.user);
    let message;
    if (role === "admin") {
      message = "Bookings are retrieved successfully";
    } else if (data.length === 0) {
      message = "You have no booking yet";
    } else {
      message = "Your bookings are retrieved successfully";
    }

    res.status(200).json({
      success: true,
      message,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Bookings data do not found!!",
      errors: err,
    });
  }
};

const updateBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.updateBookingsIntoDB(
      req.body,
      req.params.bookingId as string,
      req?.user?.role,
      req?.user?.email
    );
    if (result?.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    } else {
      if (req?.user?.role === "admin") {
        const vehicle = await pool.query(
          `SELECT availability_status FROM vehicles WHERE ID=$1`,
          [result?.rows[0].vehicle_id]
        );
        let data = result?.rows[0];
        data.vehicle = vehicle.rows[0];
        // console.log(data);
        res.status(200).json({
          success: true,
          message: "Booking marked as returned. Vehicle is now available",
          data: result?.rows[0],
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Booking cancelled successfully",
          data: result?.rows[0],
        });
      }
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Booking updated failed!!",
      errors: err,
    });
  }
};

export const bookingsControllers = {
  createVehicle,
  getBookings,
  updateBookings,
};
