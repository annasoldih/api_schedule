import { Request, Response, NextFunction } from "express";
import StatusCode from "../entities/enums";
import AvailableService from "../services/AvailableService";

export default class AvailableController {
  static get(req: Request, res: Response, _next: NextFunction) {
    const { start, end } = req.body;
    const response = AvailableService.get(start, end);
    return res.status(StatusCode.OK).json(response);
  }
}
