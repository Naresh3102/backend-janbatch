const express = require("express");

const app = express();

// http://localhost:5000/something

// CRUD -
// CREATE - POST
// READ - GET
// UPDATE - PUT, PATCH
// DELETE - DELETE

// 100 -
// 300 - Redirection

// 200 - Success series(200, 201, 204, etc.,)
// 200 - OK
// 201 - CREATED
// 204 - NO CONTENT -delecting

// 400 - Client error(400, 401, 403, 404, etc.,)
// 400 - BAD REQUEST
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not found

// 500 - Server error(500, 503, 504, etc.,)
// 500 - Internal server error

app.get("/", (req, res) => {
  res.status(200).json({
    name: "saran",
    age: 456,
    skills: [],
    address: {},
  });
});

app.get("/n", (req, res) => {
  res.json({
    name: "naresh",
    age: 456,
    skills: [],
    address: {},
  });
});

app.post("/n", (req, res) => {
  res.json({
    name: "naresh",
    age: 456,
    skills: [],
    address: {},
  });
});

app.listen(5000, () => {
  console.log("Server is running");
});
