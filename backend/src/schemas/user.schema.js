import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../config/server.config";


const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
}, {timestamps : true});


userSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUND)
    user.password = hashedPassword
    user.avatar = `https://robohash.org/${user.username}`
    next()
  })


const userModel = model('User', userSchema);

export default userModel;
  