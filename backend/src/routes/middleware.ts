import { NextFunction, Request, Response } from "express";
import { auth } from "../utils/auth";
import { fromNodeHeaders } from "better-auth/node";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(404).json({
        message: "User not authenticated",
      });
      return;
    } else if (!session.user.id) {
      res.status(404).json({
        message: "UserId not found",
      });
      return;
    } else {
      req.userId = session.user.id;
      console.log(req.userId);
      next();
    }
  } catch (error) {
    console.error(error);
  }
}
