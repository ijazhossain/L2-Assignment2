import express, { Request, Response } from "express";
import initDB from "./config/db";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
app.use(express.json());
initDB();
app.use("/api/v1", vehiclesRoutes);
app.use("/api/v1", authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});
export default app;
