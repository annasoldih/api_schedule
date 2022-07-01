import { Request, Response, NextFunction } from 'express';
import StatusCode from '../entities/enums';
import CreateRuleService from '../services/CreateRuleService';

export default class CreateRuleController {
  static create(req: Request, res: Response, next: NextFunction) {
    const { start, end, type, limitDay, weekdays, day } = req.body;
    const response = CreateRuleService.create(
      start, end, type, limitDay, weekdays, day
    );
    if (response.error === true) return next(response);
    return res.status(StatusCode.OK).json(response);
  }
}