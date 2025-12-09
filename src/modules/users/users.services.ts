import { pool } from "../../config/db";
import bcrypt from "bcrypt"
const getUsersFromDB = async () => {
  const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);
  return result;
};

const updateUserIntoDB = async (
  payload: Record<string, unknown>,
  id: string
) => {
  let { name, email, password, phone, role } = payload;
  if(password){
    password=await bcrypt.hash(password as string,10)
  }
  
  const result = await pool.query(
    `UPDATE users SET 
    name=COALESCE($1,name), 
    email=COALESCE($2,email),
    password=COALESCE($3,password),
    phone=COALESCE($4,phone),
    role=COALESCE($5,role)    
    WHERE id=$6 
    RETURNING id,name,email,phone,role`,
    [name, email, password, phone, role, id]
  );
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
        DELETE FROM users WHERE ID=$1
        `,
    [id]
  );
  return result;
};
export const usersServices = {
  getUsersFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
