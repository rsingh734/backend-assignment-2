import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: error.details.map((detail: any) => detail.message)
      });
      return;
    }
    
    next();
  };
};