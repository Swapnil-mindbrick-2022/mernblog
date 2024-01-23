import User from "../models/user.model.js";
import brcrypt from 'bcryptjs';
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email == "" ||
    username === "" ||
    password === ""
  ) {
    return res.status(400).json({message:"all field are required "})
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
    res.status(500).json({message:error.message})
  }

 
};
