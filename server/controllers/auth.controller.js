import User from "../models/user.model.js";
import brcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email == "" ||
    username === "" ||
    password === ""
  ) {
    return next(errorHandler(400, 'all field are required '))
  }

  const hashpasssword = brcrypt.hashSync(password, 10)

  const newUser = new User({
    username,
    email,
    password:hashpasssword

  })
  try {
    await  newUser.save()

    res.status(200).json({
      message:"successfully user registers ",
      newUser,
  
    })
  } catch (error) {
    next(error)
  }

 
};
