import {Router} from "express";
import userRouter from "./user.route.js";

const v1Router = Router();

v1Router.get("/", (req, res) => {
    res.json({
        msg : "v1 router working"
    })
})

v1Router.use("/user", userRouter);

export default v1Router;