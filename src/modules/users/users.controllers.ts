import { Request, Response } from "express";
import { usersServices } from "./users.services";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Users data do not found!!",
      errors: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.updateUserIntoDB(
      req.body,
      req.params.userId as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "User updated failed!!",
      errors: err,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.deleteUserFromDB(
      req.params.userId as string
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "User deletion failed!!",
      errors: err,
    });
  }
};
export const usersControllers = {
  getUsers,
  updateUser,
  deleteUser,
};
