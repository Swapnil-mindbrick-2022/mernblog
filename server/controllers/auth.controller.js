import User from "../models/user.model.js";
import brcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
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


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = brcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWTSECRET, { expiresIn: '1d' });

    // Destructure the password field from the user document
    const { password: pass, ...userData } = validUser._doc;

    // Use res.status before sending the response
    res.status(200).cookie('access_token', token, {
      httpOnly: true
    }).json({
      success: true,
      message: 'Signin Successfully',
      userData
    });

  } catch (error) {
    next(error);
  }
};