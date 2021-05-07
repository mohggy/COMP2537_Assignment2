const express = require("express");
const app = express();
const fs = require("fs");
const mysql = require("mysql");

app.use("/style", express.static("./style"));
app.use("/scripts", express.static("./scripts"));

app.get("/", function (req, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Friday23",
    multipleStatements: true,
  });

  const createDBAndTables = `CREATE DATABASE IF NOT EXISTS insync;
    use insync;
    CREATE TABLE IF NOT EXISTS profile (
    ID int NOT NULL AUTO_INCREMENT,
    firstName varchar(30) NOT NULL,
    lastName varchar(30) NOT NULL,
    email varchar(30) NOT NULL,
    age int NOT NULL,
    job varchar(50) NOT NULL,
    PRIMARY KEY (ID));`;

  connection.connect();
  connection.query(createDBAndTables, function (error, results, fields) {
    if (error) {
      throw error;
    }
    //console.log(results);
  });
  connection.end();

  let doc = fs.readFileSync("./index.html", "utf8");
  res.send(doc);
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.get("/get-profile", function (req, res) {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Friday23",
    database: "insync",
  });
  connection.connect();
  connection.query("SELECT * FROM profile", function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("Rows returned are: ", results);
    res.send({ status: "success", rows: results });
  });
  connection.end();
});

app.post("/add-profile", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  console.log("First Name", req.body.firstName);
  console.log("Last Name", req.body.lastName);
  console.log("Email", req.body.email);

  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Friday23",
    database: "insync",
  });
  connection.connect();
  // TO PREVENT SQL INJECTION, DO THIS:
  // (FROM https://www.npmjs.com/package/mysql#escaping-query-values)
  connection.query(
    "INSERT INTO profile (firstName, lastName, email, age, job) values (?, ?, ?, ?, ?)",
    [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.age,
      req.body.job,
    ],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      //console.log('Rows returned are: ', results);
      res.send({ status: "success", msg: "Recorded added." });
    }
  );
  connection.end();
});

// POST: deleting the row by profile ID
app.post("/delete-by-ID", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Friday23",
    database: "insync",
  });
  connection.connect();
  const {body: {id}} = req;
  connection.query(
    "DELETE FROM profile WHERE ID = ?",
    id,
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      //console.log('Rows returned are: ', results);
      res.send({ status: "success", msg: "Deleted row." });
    }
  );
  connection.end();
});

// POST: updating the profile
app.post("/update-profile", function (req, res) {
    res.setHeader("Content-Type", "application/json");

    let connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Friday23",
      database: "insync"
    });
    connection.connect();
    const {body: {id, first, last, email, age, job}} = req;

    connection.query("UPDATE profile SET firstName = ?, lastName =?, email = ?, age = ?, job = ? WHERE ID = ?",
          [first, last, email, age, job, id],
          function (error, results, fields) {
      if (error) {
          throw error;
      }
      //console.log('Rows returned are: ', results);
      res.send({ status: "success", msg: "Recorded updated." });

    });
    connection.end();

});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
console.log("CRUD app listening on port " + port + "!");
});
