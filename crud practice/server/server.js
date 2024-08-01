const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.listen(8080, () => {
    console.log("server running on port 8080")
});

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2911",
    database: "courses"
});

app.get("/api/getAllCourses", (req, res) => {
    const query = "select* from courses";
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/api/addNewCourses", (req, res) => {
    const { fees, name, duration } = req.body;
    const query = "insert into courses (fees,name,duration) values (?,?,?)";
    db.query(query, [fees, name, duration], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/api/updateCourses", (req, res) => {
    const { id, fees, name, duration } = req.body;
    const query = "update courses set fees = ? , name = ? , duration = ? where id = ?";
    db.query(query, [fees, name, duration, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/api/deleteCourses/:id", (req, res) => {
    const { id } = req.params;
    const query = "delete from courses where id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});