import { Request, Response, NextFunction } from "express";
import StatusCode from "../entities/enums";
import DeleteRuleService from "../services/DeleteRuleService";

export default class DeleteRuleController {
  static get(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const response = DeleteRuleService.delete(+id);
    return res.status(StatusCode.OK).json(response);
  }
}