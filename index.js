const express = require("express");

const app = express();

app.get("/", (req, res) => {
 res.send("Hello World");
});

app.listen(3001, () => {
 console.log("Server is running on http://127.0.0.1:3001");
});