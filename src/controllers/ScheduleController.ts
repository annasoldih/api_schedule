import { Request, Response, NextFunction } from 'express';
import StatusCode from '../entities/enums';
import ScheduleService from "../services/ScheduleService";

export default class ScheduleController {
  static get(_req: Request, res: Response, _next: NextFunction) {
    const response = ScheduleService.get();
    return res.status(StatusCode.OK).json(response);
  }
}