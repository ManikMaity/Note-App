import userRepo from "../repositories/user.repo.js"
import { StatusCodes } from "http-status-codes"

export const signupService = async (email, password) => {
    try {
      const user = await userRepo.create({ email, password })
      return user
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw err
      }
      else if (err.code === 11000) {
       throw {
         statusCode : StatusCodes.CONFLICT,
         message : "User already exists",
         explanation : ["User already exists"]
       }
      }
      throw err
    }
  }