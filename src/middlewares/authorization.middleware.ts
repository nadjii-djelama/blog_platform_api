import jwt from "jsonwebtoken";
import { envConfig } from "../config/envconfig.config.ts";
import type { Request, Response, NextFunction } from "express";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth_header = req.headers.authorization;
    if (!auth_header) {
      return res.status(401).json({ message: "Authorization header missing." });
    }
    const token = auth_header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing." });
    }
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    next();
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

export default authorization;
