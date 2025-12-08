import express, { Request, Response } from "express";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success:true,
    message:"Server is running successfully"
  });
});
export default app;