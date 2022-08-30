require("dotenv").config();
const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
// read
app.get("/api/v1/countries", async (req, res) => {
  try {
    let countries = await pool.query("Select * from country");
    res.send({ countries: countries.rows, status: "Sucessful" });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Error",
      message: error.message,
    });
  }
});
// create
app.post("/api/v1/countries", async (req, res) => {
  try {
    let countries = await pool.query(
      `INSERT INTO country ( name, population, king) VALUES ($1, $2, $3 )`,
      [req.body.country, req.body.population, req.body.king]
    );
    res
      .status(200)
      .send({ status: "sucessful", messsage: "Added country sucessfully" });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Error",
      message: error.message,
    });
  }
});
// update
app.put("/api/v1/countries/:id", async (req, res) => {
  try {
    let country = await pool.query(
      `UPDATE country SET name=$1,population=$2,king=$3 WHERE id=$4`,
      [req.body.name, req.body.population, req.body.king, req.params.id]
    );
    res.send({ status: "sucessful", messsage: "Updated country sucessfully" });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Error",
      message: error.message,
    });
  }
});
app.delete("/api/v1/countries/:id", async (req, res) => {
  try {
    let country = await pool.query(`DELETE FROM country WHERE id=$1`, [
      req.params.id,
    ]);
    res.send({ status: "sucessful", messsage: "Deleted country sucessfully" });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Error",
      message: error.message,
    });
  }
});
app.get("/api/v1/countries/:id", async (req, res) => {
  try {
    let countries = await pool.query("Select * from country WHERE id=$1", [
      req.params.id,
    ]);
    res.send({ countries: countries.rows, status: "Sucessful" });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Error",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
