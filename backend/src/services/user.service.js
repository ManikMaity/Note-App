import userRepo from "../repositories/user.repo.js"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/server.config.js";
import bcrypt from "bcrypt";

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


export const signinService = async (email, password) => {

  let user = await userRepo.getUserByEmail(email)
  if (!user) {
    throw {
      statusCode : StatusCodes.NOT_FOUND,
      message : "User not found",
      explanation : ["User not found"]
    }
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw {
      statusCode : StatusCodes.UNAUTHORIZED,
      message : "Invalid credentials",
      explanation : ["Invalid credentials"]
    }
  }

  const token = jwt.sign({id : user._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN});

  const {password : pass, ...rest} = user._doc;
  return {...rest, token}
}