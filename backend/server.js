import express from "express";
import dv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs";

import connect from "./db/connect.js";


const app = express();

// Middleware

app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

// Routes


const routeFiles = fs.readdirSync('./src/routes') // to extracting the routes files from the routes folder

routeFiles.forEach((file) => {
    import(`./src/routes/${file}`)
      .then((route) => {
        app.use("/api/v1", route.default);
      })
      .catch((err) => {
        console.log("Failed to load route file", err);
      });
  });

dv.config();

const port = process.env.PORT || 8000;

const server = async () => {
    try {
        await connect();
        app.listen(port,() => {
            console.log(`Server is running on port ${port}`)
        });
    } catch(error) {
        console.log("Failed to start the server...", error.message);
    }
}

server();