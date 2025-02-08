import express from "express";
import { PORT } from "./config/server.config.js";
import connectDB from "./config/db.config.js";
import v1Router from "./routes/api/v1/v1.route.js";

const app = express();

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