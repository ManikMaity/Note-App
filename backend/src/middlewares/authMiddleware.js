import { StatusCodes } from "http-status-codes"
import { customErrorResponse } from "../utils/customResponse.js"
import userRepo from "../repositories/user.repo.js"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/server.config.js";



const authenticate = async (req, res, next) => {
  try {
    const token = req.headers['note-app-token']
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Missing token',
          explanation: "NoteApp token isn't provided"
        })
      )
    }
    const data = jwt.verify(token, JWT_SECRET)
    if (!data) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid token',
          explanation: 'NoteApp token is invalid'
        })
      )
    }

    const user = await userRepo.getById(data.id)
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid token',
          explanation: 'Slack token is invalid'
        })
      )
    }
    req.user = user
    next()
  } catch (err) {
    console.log(err)
    if (err.name === 'JsonWebTokenError') {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid auth token provided',
          explanation: 'Invalid auth token provided'
        })
      )
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          statusCode: StatusCodes.FORBIDDEN,
          message: 'Expired auth token provided',
          explanation: 'Expired auth token provided'
        })
      )
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(err))
  }
}

export default authenticate;