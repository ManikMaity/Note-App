import { StatusCodes } from "http-status-codes"
import { customErrorResponse, customSuccessResponse } from "../utils/customResponse.js"
import { signinService, signupService } from "../services/user.service.js"

export const signupController = async (req, res) => {
    try {
      const {email, password } = req.body
      const user = await signupService(email, password)
      res
        .status(StatusCodes.CREATED)
        .json(customSuccessResponse('User created successfully', user))
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(customErrorResponse(err))
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(customErrorResponse(err))
      }
    }
  }


  export const signinController = async (req, res) => {
    try {
      const { email, password } = req.body
      const data = await signinService(email, password)
      res
        .status(StatusCodes.OK)
        .json(customSuccessResponse('User signed in successfully', data))
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(customErrorResponse(err))
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(customErrorResponse(err))
      }
    }
  }
  