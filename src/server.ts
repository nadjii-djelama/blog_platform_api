import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sessionMiddleware } from "./middlewares/session.middleware.ts";
import { envConfig } from "./config/envconfig.config.ts";
import db_conection from "./config/dbconnection.config.ts";

// Database connection
await db_conection();

const app = express();

// session middleware

// Globally middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(sessionMiddleware);

// Import Routes
import userRoute from "./routes/user.route.ts";
import postRoute from "./routes/posts.route.ts";
app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);

// app.get("*", (req, res) => {
//   res.status(404).json({ message: "This is an Invalid page." });
// });

//  Start server
const port: number = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`server run in port: ${port}`);
});
