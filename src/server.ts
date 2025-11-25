import express from "express";
import cors from "cors";
import { envConfig } from "./config/envconfig.config.ts";
import db_conection from "./config/dbconnection.config.ts";

// Database connection
await db_conection();
const app = express();

//Globally middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import Routes
import userRoute from "./routes/user.route.ts";
import postRoute from "./routes/posts.route.ts";
app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);

//start server
const port: number = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`server run in prot: ${port}`);
});
