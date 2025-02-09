import express from "express";
import { PORT } from "./config/server.config.js";
import connectDB from "./config/db.config.js";
import v1Router from "./routes/api/v1/v1.route.js";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://note-app-manik.vercel.app"
    ],
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "note-app-token"]
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "working" });
});

app.use("/api/v1", v1Router);

await connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
