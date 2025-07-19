import express from "express";
import cors from "cors";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const app = express();
const commentsRoutes = require("./routes/commentRoutes");
const allowedOrigins = ["https://blogapp-ben.vercel.app"];

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Server is up and running! ")
    )
  )
  .catch((err) => console.log("❌ MongoDB connection error:", err));
