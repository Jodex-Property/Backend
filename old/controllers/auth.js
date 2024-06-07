import { prismaClient } from "../../app.js";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { JWT_SECRET } from "../secrets.js";
import { BadRequests } from "../exception/bad-request.js";
import { ErrorCodes } from "../exception/root.js";
import { UnprocessableEntity } from "../exception/validation.js";
import { SignUpSchema } from "../../src/schemas/user.js";

export const signup = async (req, res, next) => {
  SignUpSchema.parse(req.body);
  const { email, password, passwordConfirm, userName, userType } = req.body;
  console.log(password, passwordConfirm);

  if (password !== passwordConfirm) {
    new BadRequests("Password must be the same", ErrorCodes.INCORRECT_PASSWORD);
  }

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    new BadRequests("User already exists", ErrorCodes.USER_ALREADY_EXISTS);
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
  if (user.user == "tenant") {
    const tenant = await prismaClient.tenant.create({
      data: {
        userName: user.userName,
        email: user.email,
        password: hashSync(user.password, 10),
      },
    });
    console.log(`tenant is ${tenant.id}`);
  } else {
    const landlord = await prismaClient.landlord.create({
      data: {
        userName: user.userName,
        email: user.email,
        password: hashSync(user.password, 10),
      },
    });
    console.log(`Landlord id is ${landlord.id}`);
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.header("x-auth-token", token).status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password, userType } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFound("User does not exist", ErrorCodes.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequests("incorrect password", ErrorCodes.INCORRECT_PASSWORD);
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.status(201).json({ user, token });
};

export const me = async (req, res) => {
  res.json(req.user);
};
