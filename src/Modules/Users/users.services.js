import { prisma } from "../../../app.js";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { JWT_SECRET } from "../../secrets.js";
import { BadRequests } from "../../exception/bad-request.js";
import { ErrorCodes } from "../../exception/root.js";
import { UnprocessableEntity } from "../../exception/validation.js";
import s3 from "../../Configurations/s3.js";
import * as secrets from "../../secrets.js";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient, UserType } from "@prisma/client";
//const prisma = new PrismaClient();

export const signUp = async ({
  userName,
  phoneNumber,
  email,
  fullName,
  password,
  passwordConfirm,
  userType,
}) => {
  if (password !== passwordConfirm) {
    throw new Error("Passwords do not match");
  }

  const user = await prisma.user.create({
    data: {
      userName,
      phoneNumber,
      email,
      fullName,
      password: hashSync(password, 10),
      passwordConfirm: hashSync(password, 10),
      userType: userType,
    },
  });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  user.password = undefined;
  user.passwordConfirm = undefined;
  return { user, token };
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

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
  return { user, token };
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  users.password = undefined;
  users.passwordConfirm = undefined;
  return users;
};

export const updateUser = async (userId, updateData, file) => {
  const { phoneNumber, fullName } = updateData;

  let profilePictureUrl;

  if (file) {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ACL: "public-read",
    };

    const uploadResult = await s3.upload(params).promise();
    profilePictureUrl = uploadResult.Location;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      phoneNumber,
      fullName,
      profilePicture: profilePictureUrl,
    },
  });

  return user;
};
