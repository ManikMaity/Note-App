import {Router} from "express";
import validate from "../../../validations/validator.js";
import { signinController, signupController } from "../../../controllers/user.controller.js";
import { signupSchema } from "../../../validations/user.validation.js";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.json({
        msg : "user router working"
    })
});
userRouter.post('/signup', validate(signupSchema), signupController)
userRouter.post('/signin', validate(signupSchema), signinController)

export default userRouter;