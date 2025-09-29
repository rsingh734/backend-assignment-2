// src/app.ts
import express, { Express } from "express";
import morgan from "morgan";

const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));

// Middleware to parse JSON requests
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Export the app
export default app;