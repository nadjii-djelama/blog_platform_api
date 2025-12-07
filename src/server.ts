import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envConfig } from "./config/envconfig.config.ts";

// Database connection
import db_conection from "./config/dbconnection.config.ts";
await db_conection();

const app = express();

// import Midllewares
import { sessionMiddleware } from "./middlewares/session.middleware.ts";
import { arcjetMiddle } from "./middlewares/arcjet.middleware.ts";

// Globally middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(arcjetMiddle);

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
