const express = require("express");
const cors = require("cors");
const chatRoute = require("./routes/chat");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/aiassistent", chatRoute);

app.get("/health", (req, res) => {
  console.log("I am in Health api");
  res.json({
    service: "Backend Chat Ai server",
    status: "active",
    time: new Date(),
  });
});

app.use((error, req, res, next) => {
  res.status(500).json({ errorMessage: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
