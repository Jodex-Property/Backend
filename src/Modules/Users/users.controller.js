//import SignUpSchema from "../../schemas/user.js";
//import signUp from "./users.services.js";
import * as userService from "./users.services.js";

export const register = async (req, res, next) => {
  //SignUpSchema.parse(req.body);
  const {
    userName,
    phoneNumber,
    email,
    fullName,
    password,
    passwordConfirm,
    userType,
  } = req.body;

  try {
    const { user, token } = await userService.signUp({
      userName,
      phoneNumber,
      email,
      fullName,
      password,
      passwordConfirm,
      userType,
    });
    res.header("x-auth-token", token).json({ user, token });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      res.json({ message: "Email already exists" });
    }
    if (error.code === "P2002" && error.meta.target.includes("userName")) {
      res.json({ message: "username already exists" });
    }
    next(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await userService.login({ email, password });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const me = async (req, res) => {
  res.json(req.user);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { phoneNumber, fullName } = req.body;
  const file = req.file;

  try {
    const user = await userService.updateUser(
      req.user.id,
      { phoneNumber, fullName },
      file
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//module.exports = { register };
