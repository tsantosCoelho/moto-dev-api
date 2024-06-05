import mysql from "mysql2/promise";

const con = await mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "@dm!n",
  database: "motodev",
});

console.log("Conexão com BD realizada");
export default con;
