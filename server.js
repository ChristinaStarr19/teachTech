const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({ success: true });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
// app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Connect to Mongo DB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/teachTech")
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database.");
    console.log(err);
  });

app.listen(PORT, function () {
  console.log(`Express server is running on http://localhost:${PORT}!`);
});
