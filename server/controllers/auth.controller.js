import User from "../models/user.model.js";
import brcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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
    return next(errorHandler(400, "all field are required "));
  }

  const hashpasssword = brcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashpasssword,
  });
  try {
    await newUser.save();

    res.status(200).json({
      message: "successfully user registers ",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = brcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWTSECRET, {
      expiresIn: "1d",
    });

    // Destructure the password field from the user document
    const { password: pass, ...userData } = validUser._doc;

    // Use res.status before sending the response
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Signin Successfully",
        userData,
      });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      // Existing user logic
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
        expiresIn: "1d",
      });
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Sign in successfully",
          rest,
        });
    } else {
      // New user logic
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashPassword = brcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name
          .toLowerCase()
          .split("")
          .join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET, {
        expiresIn: "1d",
      });
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Sign in successfully",
          rest,
        });
    }
  } catch (error) {
    next(error);
  }
};
