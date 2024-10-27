import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

//localhost, root, A15162006b, users_database

const usersConnection = await mysql.createConnection({
  host: process.env.MYSQL_PUBLIC_URL,
  port: 3306,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  connectTimeout: 10000,
});

export default usersConnection;
