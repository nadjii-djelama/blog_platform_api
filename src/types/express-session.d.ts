import "express-session";
import "express";
declare module "express-session" {
  interface SessionData {
    page_views?: number;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        user: string;
      };
    }
  }
}
