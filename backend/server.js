import path from "path";
import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import dbConnection from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(ENV_VARS.PORT, async () => {
  try {
    await dbConnection();
    console.log(`Server started on port: ${ENV_VARS.PORT}`);
  } catch (error) {
    console.error("error : ", error);
  }
});
