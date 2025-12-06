import session from "express-session";
import { envConfig } from "../config/envconfig.config.ts";
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
});
export { sessionMiddleware };
