import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors()); // Enable cors for all routes

app.use(fileUpload());

// Routes


// Error Handling
app.use(errorHandler);

export default app;