import { isSpoofedBot } from "@arcjet/inspect";
import { aj } from "../config/arcjet.config.ts";
import type { Request, Response, NextFunction } from "express";

const arcjetMiddle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await aj.protect(req, { requested: 1 }); // Use 1 for normal requests
    console.log("Arcjet decision:", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      }
      return res.status(403).json({ error: "Forbidden" });
    }

    if (decision.ip.isHosting() || decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next(); // ✅ Fixed - continues to your routes
  } catch (err: any) {
    console.log("Arcjet error:", err.message);
    next(err); // ✅ Fail open + proper error propagation
  }
};

export { arcjetMiddle };
