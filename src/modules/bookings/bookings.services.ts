import { pool } from "../../config/db";

const createBookingsIntoDB = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const reqVehicle = await pool.query(
    `SELECT id,vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE ID=$1`,
    [vehicle_id]
  );
  console.log(reqVehicle.rows[0]);
  const { id, vehicle_name, daily_rent_price, availability_status } =
    reqVehicle.rows[0];
  console.log(reqVehicle.rows[0]);
  const start = new Date(rent_start_date as string).getTime();
  //  console.log({start});
  const end = new Date(rent_end_date as string).getTime();
  const number_of_days = (end - start) / (1000 * 60 * 60 * 24);
  const total_price = Number(daily_rent_price * number_of_days);
  console.log(typeof total_price);
  if (availability_status === "booked") {
    throw new Error("SORRY, this vehicle is already booked!");
  }

  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,'active') RETURNING id,customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  await pool.query(
    `UPDATE vehicles SET 
    
    availability_status='booked' 
    WHERE id=$1 
    RETURNING *`,
    [id]
  );
  const vehicle = { vehicle_name, daily_rent_price };

  return { result, vehicle };
};
const getBookingsFromDB = async (role: string, id: string) => {
  console.log({ role, id });
  let result;
  if (role === "admin") {
    result = await pool.query(
      `SELECT id, 
    customer_id, vehicle_id, TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, 
    TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, 
    total_price, status FROM bookings`
    );
  } else if (role === "customer") {
    result = await pool.query(
      `SELECT id, customer_id, vehicle_id, TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, total_price, status FROM bookings WHERE CUSTOMER_ID=$1`,
      [id]
    );
  }

  return result;
};

const updateVehicleIntoDB = async (
  payload: Record<string, unknown>,
  id: string
) => {};

export const bookingsServices = {
  createBookingsIntoDB,
  getBookingsFromDB,
  updateVehicleIntoDB,
};
