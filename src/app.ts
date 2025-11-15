// src/app.ts
import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import setupSwagger from "../config/swagger";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";
import cors from "cors";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app: Express = express();

app.use(cors(getCorsOptions()));

// Setup Swagger UI
setupSwagger(app);

// Apply basic Helmet security
app.use(getHelmetConfig());

// Use morgan for HTTP request logging
app.use(morgan("combined"));

// Middleware to parse JSON requests
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

app.use("/api/v1", employeeRoutes);
app.use("/api/v1", branchRoutes);

// Export the app
export default app;