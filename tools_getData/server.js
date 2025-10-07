const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to receive logs
app.post("/log", (req, res) => {
  console.log("📩 Log received:", req.body.log);
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
