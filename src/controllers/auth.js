import { prismaClient } from "../../app.js";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { JWT_SECRET } from "../secrets.js";
import { BadRequests } from "../exception/bad-request.js";
import { ErrorCodes } from "../exception/root.js";
import { UnprocessableEntity } from "../exception/validation.js";
import { SignUpSchema } from "../schemas/user.js";
import { NotFound } from "../exception/not-found.js";

export const signup = async (req, res, next) => {
  SignUpSchema.parse(req.body);
  const { email, password, passwordConfirm, userName, userType } = req.body;

  if (password !== passwordConfirm) {
    return res.json({ message: "Passwords do not match" });
  }

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    // throw Error("User exists");
    next(
      new BadRequests("User already exists", ErrorCodes.USER_ALREADY_EXISTS)
    );
  }
  user = await prismaClient.user.create({
    data: {
      email,
      password: hashSync(password, 10),
      userName,
      passwordConfirm: hashSync(passwordConfirm, 10),
      user: userType,
    },
  });
  // if (userType == "LANDLORD") {
  //   landlord = await prismaClient.landlord.create({
  //     data: {
  //       userName: user.userName,
  //       email: user.email,
  //       password: hashSync(user.password, 10),
  //     },
  //   });
  //   console.log(`Landlord id is ${landlord.id}`);
  // } else if (userType === "TENANT") {
  //   await prismaClient.tenant.create({
  //     data: {
  //       userName: user.userName,
  //       email: user.email,
  //       password: hashSync(user.password, 10),
  //     },
  //   });
  //   console.log(`tenant is ${tenant.id}`);
  // }
  //}
  // console.log(userType);
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  user.password = undefined;
  user.passwordConfirm = undefined;
  res.header("x-auth-token", token).status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    res.json({ message: "This user does not exist" });
  }
  if (!compareSync(password, user.password)) {
    res.json({
      message: "incorrect password",
      error: ErrorCodes.INCORRECT_PASSWORD,
    });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  user.password = undefined;
  user.passwordConfirm = undefined;
  res.status(201).json({ user, token });
};

export const me = async (req, res) => {
  res.json(req.user);
};
