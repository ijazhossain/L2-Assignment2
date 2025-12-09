import express, { Request, Response } from "express";
import initDB from "./config/db";
const app = express();
app.use(express.json());
initDB();
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success:true,
    message:"Server is running successfully"
  });
});
export default app;