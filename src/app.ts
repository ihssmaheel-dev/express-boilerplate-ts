import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import errorHandler from "./middlewares/errorHandler";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors()); // Enable cors for all routes

app.use(fileUpload());

// Routes
app.use("/v1/user", userRoutes);

// Error Handling
app.use(errorHandler);

export default app;