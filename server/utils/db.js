import mysql from 'mysql2/promise';

const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "phonebook"
});

try {
    console.log("Connected");
} catch (err) {
    console.log("Connection error: " + err.message);
}

export default con;
