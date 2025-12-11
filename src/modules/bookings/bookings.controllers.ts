import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

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
    const result = await bookingsServices.getBookingsFromDB(
      req?.user?.role,
      req?.user?.id
    );
    if (result?.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No booking found!!",
        data: result?.rows,
      });
    } else {
      if (req?.user?.role === "admin") {
        res.status(200).json({
          success: true,
          message: "Bookings are retrieved successfully",
          data: result?.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Your bookings are retrieved successfully",
          data: result?.rows,
        });
      }
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Bookings data do not found!!",
      errors: err,
    });
  }
};

const updateBookings = async (req: Request, res: Response) => {};

export const bookingsControllers = {
  createVehicle,
  getBookings,
  updateBookings,
};
