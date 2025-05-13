import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './config/db.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT 

app.get("/", (req, res) => {
    res.send("server ready");
})

app.listen(PORT, () =>
{
    connectDB();
    console.log (`Server started on port ${PORT} `)
})