import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//--- Tracking of routes by code line no ---
// Creating a new user = 13
// Logging in the existing user and assigning token = 38

export const test = (req, res) => {
  res.json("This is users routes");
};

//Creating a user
export const createUser = async (req, res) => {
  const commonPasswords = ["querty", "iloveyou"];
  for (let i = 0; i < commonPasswords.length; i++) {
    if (commonPasswords[i] === req.body.password) {
      return res.status(400).json("Password Too Common");
    }
  }
  const isRegistered = await User.findOne({ email: req.body.email });
  console.log("Is Registered", isRegistered);
  if (isRegistered)
    return res.status(400).json("User is already registered with us");

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    user.save();
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
};

//Logging in the existing user and assigning token
export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) return res.status(400).json("User Not Found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Credentials Mismatched !");

  const token = jwt.sign({ id: user._id }, "thisistokensecret");
  const data = {
    token: token,
    userId: user._id,
  };
  console.log(data);
  res.status(200).json(data);
};

//Get Self By Id
export const getSelfById = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const data = jwt.decode(token);
  const user = await User.findOne({ _id: data?.id });
  if (!user) return res.status(400).json("Cannot Found User");
  res.status(200).json(user);
};
