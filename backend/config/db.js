import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.error("error : ", error);
    console.log("Failed to connect to MongoDB");
  }
};

export default dbConnection;
