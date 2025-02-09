import express from "express";
import { PORT } from "./config/server.config.js";
import connectDB from "./config/db.config.js";
import v1Router from "./routes/api/v1/v1.route.js";
import cors from "cors";

const app = express();

// const corsOptions = {
//     credentials: true,
//     origin: ['http://localhost:3000', 'http://localhost:5173', 'https://note-app-2p5q-pq8pv8902-manik-maitys-projects.vercel.app'] 
// };


app.use(cors({
    credentials: true,
    origin : "*"
}));
app.options( '*' , cors()) 

app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        msg : "working"
    })
})

app.use("/api/v1", v1Router);

await connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})