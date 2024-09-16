import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be atleast 6 characters",
      });
    }

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = new User({
      fullname: fullname,
      username: username,
      password: hashedPassword,
      gender: gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await user.save();
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ ...user._doc, password: "" });
  } catch (error) {
    // remove this line after development
    console.log("Error in signup controller : ", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passwordOk = await bcryptjs.compare(
      password,
      userExists?.password || ""
    );
    if (!passwordOk) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(userExists._id, res);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      content: userExists,
    });
  } catch (error) {
    console.log("error in login controller : ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("chat-app", "", { maxAge: 0 });
    res
      .status(200)
      .json({ success: true, message: "logged  out successfully" });
  } catch (error) {
    console.log("error in logout controller : ", error);
    res.status(500).json({ success: false, error: "Internal Server Errror" });
  }
}
