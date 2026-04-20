import connectDB from "./db/index.js"
//import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import authRoutes from "./routes/user.routes.js";
import fileRoutes from "./routes/file.routes.js";
import queryRoutes from "./routes/query.routes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app= express()

dotenv.config({
    path:"../.env"
})


app.use(express.json ({}));
app.use(express.urlencoded ({extended: true}));
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/query", queryRoutes);

app.use(notFound); 
app.use(errorHandler); 

export  { app }