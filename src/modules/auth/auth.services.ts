import bcrypt from "bcrypt";
import config from "../../config";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
const signupUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  if (!password || (password as string).length < 6) {
  throw new Error("Password must be at least 6 characters long");
}
  const hashedPassword = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `
    INSERT INTO users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`,
    [name, email, hashedPassword, phone, role]
  );
  return result;
};
const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    return null;
  }
  const originalUser = result.rows[0];
  const match = await bcrypt.compare(password, originalUser.password);
  if (!match) {
    return false;
  }
  const token = jwt.sign(
    {
      name: originalUser.name,
      email: originalUser.email,
      role: originalUser.email,
    },
    config.jwt_secret as string,
    { expiresIn: "7d" }
  );
  
  const user = {
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
    phone: result.rows[0].phone,
    role: result.rows[0].role,
  };
  return { token, user };
};
export const authServices = {
  signupUser,
  loginUser,
};
