import { Request, Response, NextFunction } from "express";
import { ServerError } from "../errors/server-error";

export const requestHandler = (callback) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      if (error instanceof ServerError) {
        res.status(error.statusCode || 500);
        return res.json({ message: error.message });
      }

      console.log(error);
      res.status(500);
      return res.json({ message: "Internal server error" });
    }
  };
};
