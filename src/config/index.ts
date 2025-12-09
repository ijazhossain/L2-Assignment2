import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const config = {
  port: process.env.PORT,
  connection_str: process.env.CONNECTION_STR,
  salt_round: process.env.SALT_ROUND,
  jwt_secret: process.env.JWT_SECRET,
};
export default config;
