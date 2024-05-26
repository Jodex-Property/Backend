import dotenv from "dotenv";
import {
  EMAIL_PASSWORD,
  EMAIL_USERNAME,
  GOOGLE_CLIENTID,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_SECRET_KEY,
  JWT_SECRET_KEY,
  PORT,
} from "./config.variables";

export const config = {
  server: {
    PORT: PORT,
  },
  jwt: {
    JWT_SECRET: JWT_SECRET_KEY,
  },

  google: {
    GOOGLE_CLIENTID: GOOGLE_CLIENTID,
    GOOGLE_SECRET_KEY: GOOGLE_SECRET_KEY,
    GOOGLE_REDIRECT_URL: GOOGLE_REDIRECT_URL,
    GOOGLE_REFRESH_TOKEN: GOOGLE_REFRESH_TOKEN,
  },
  Email: {
    EMAIL_PASSWORD: EMAIL_PASSWORD,
    EMAIL_USERNAME: EMAIL_USERNAME,
  },
};
