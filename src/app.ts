import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors()); // Enable cors for all routes

// Routes


app.use(fileUpload());

export default app;