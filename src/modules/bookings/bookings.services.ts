import { pool } from "../../config/db";

const createBookingsIntoDB = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const reqVehicle = await pool.query(
    `SELECT id,vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE ID=$1`,
    [vehicle_id]
  );
  if (reqVehicle.rows.length === 0) {
    throw new Error("Vehicle not Found for booking!");
  }
  //   console.log(reqVehicle.rows[0]);
  const { id, vehicle_name, daily_rent_price, availability_status } =
    reqVehicle.rows[0];
  //   console.log(reqVehicle.rows[0]);
  const start = new Date(rent_start_date as string).getTime();
  //  console.log({start});
  const end = new Date(rent_end_date as string).getTime();
  const number_of_days = (end - start) / (1000 * 60 * 60 * 24);
  const total_price = Number(daily_rent_price * number_of_days);
  //   console.log(typeof total_price);
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
    WHERE ID=$1 
    RETURNING *`,
    [id]
  );
  const vehicle = { vehicle_name, daily_rent_price };

  return { result, vehicle };
};
const getBookingsFromDB = async (payload: Record<string, unknown>) => {
  //   console.log({ role, id });
  const { id, name, email, role } = payload;

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
  } else {
    return [];
  }

  const today = new Date();
  for (const bookings of result.rows) {
    const endDate = new Date(bookings.rent_end_date);
    if (endDate < today && bookings.status !== "returned") {
      await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [
        bookings.id,
      ]);

      bookings.status = "returned";
    }
    const customer = await pool.query(
      `SELECT name,email FROM users WHERE ID=$1`,
      [bookings.customer_id]
    );
    bookings.customer = {
      name: customer.rows[0].name,
      email: customer.rows[0].email,
    };
    const vehicle = await pool.query(
      `SELECT vehicle_name,registration_number FROM vehicles WHERE ID=$1`,
      [bookings.vehicle_id]
    );
    bookings.vehicle = {
      vehicle_name: vehicle.rows[0].vehicle_name,
      registration_number: vehicle.rows[0].registration_number,
    };
  }
  return result?.rows ?? [];
};

const updateBookingsIntoDB = async (
  payload: Record<string, unknown>,
  id: string,
  role: string,
  email: string
) => {
  const booking = await pool.query(`SELECT * FROM bookings WHERE ID=$1`, [id]);
  const bookingUser = await pool.query(`SELECT * FROM users WHERE ID=$1`, [
    booking.rows[0].customer_id,
  ]);
  console.log({ bookingUser: bookingUser.rows[0].email });
  console.log(email);
  if (bookingUser.rows[0].email !== email && role === "customer") {
    throw new Error("You are not authorized!");
  }
  const today = new Date();
  const rentStartDate = booking.rows[0].rent_start_date;
  if (role === "customer" && payload.status === "cancelled") {
    if (rentStartDate < today) {
      throw new Error("You can only cancel booking before rent start date");
    }
    const result = await pool.query(
      `UPDATE bookings SET 
    status=$1 
    WHERE ID=$2 
    RETURNING id, customer_id, vehicle_id, TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, total_price, status`,
      [payload.status, id]
    );
    return result;
  } else if (role === "admin") {
    let result = await pool.query(
      `UPDATE bookings SET 
    status=$1 
    WHERE VEHICLE_ID=$2 
    RETURNING id, customer_id, vehicle_id, TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, total_price, status`,
      [payload.status, booking.rows[0].vehicle_id]
    );
    await pool.query(
      `UPDATE vehicles SET 
    availability_status='available' 
    WHERE ID=$1 
    RETURNING *`,
      [booking.rows[0].vehicle_id]
    );

    return result;
  } else {
    return null;
  }
};

export const bookingsServices = {
  createBookingsIntoDB,
  getBookingsFromDB,
  updateBookingsIntoDB,
};
