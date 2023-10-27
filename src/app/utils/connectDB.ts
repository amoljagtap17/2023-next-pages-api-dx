import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

export async function connectDB() {
  try {
    if (connection.isConnected) {
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_DB_URI!);

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to the database:", error);

    throw new Error("Failed to connect to the database.");
  }
}
