import express from "express"
import cors from 'cors';
import mongoose from 'mongoose';  

import dotenv from 'dotenv'

import { fileURLToPath } from "url"

import { dirname } from 'path';
import { connectDB } from "./db.js";

// import authRoutes from './routes/auth.js'  
import gameRoutes from './routes/games.js';  
import userRoutes from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

///// ENV CONFIG ///////////
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

//// DB INIT ////

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    });
  })
  .catch(err => {
    console.error("Failed to connect to database:", err);
    process.exit(1)
  });

// MIDDLEWARE //

app.use(cors())
app.use(express.json());

/// ROUTES

// app.use("/api/auth", authRoutes);
app.use('/api/games', gameRoutes); 
app.use('/api/users', userRoutes)

//// ERRORs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "SERVER ERROR!" });
});


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// });