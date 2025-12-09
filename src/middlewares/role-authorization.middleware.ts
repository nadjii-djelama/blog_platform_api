import type { Request, Response, NextFunction } from "express";

const rolesAuthorization = (allowedrolles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user_role = (req as any).user.role;
    if (!allowedrolles.includes(user_role)) {
      return res.status(403).json({ message: "forbidden access." });
    }
    next();
  };
};

export default rolesAuthorization;
