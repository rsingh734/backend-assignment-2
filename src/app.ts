// src/app.ts
import express, { Express } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";

const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));

// Middleware to parse JSON requests
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

app.use("/api/v1", employeeRoutes);

// Export the app
export default app;