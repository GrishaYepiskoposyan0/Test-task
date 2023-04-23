import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  POSTGRES_HOST: process.env.POSTGRES_HOST.trim(),
  POSTGRES_PORT: +process.env.POSTGRES_PORT.trim(),
  POSTGRES_USER: process.env.POSTGRES_USER.trim(),
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD.trim(),
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE.trim(),
  PORT: process.env.PORT.trim(),
  JWT_SECRET: process.env.JWT_SECRET.trim(),
};
