import {Router} from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.json({
        msg : "user router working"
    })
});
// userRouter.post('/signup', validate(signupSchema), signupController)
// userRouter.post('/signin', validate(signinSchema), signinController)

export default userRouter;