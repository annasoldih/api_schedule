import { Rule } from '../entities/interfaces';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import HttpException from "../entities/errorClass";
import StatusCode from "../entities/enums";
import {
  END_TIME_INCORRECT,
  ERROR_START_AFTER,
  NOT_ARRAY,
  NOT_TODAY,
  START_TIME_INCORRECT,
  ID_NOT_NUMBER,
  ID_REQUIRED,
  LIMIT_REQUIRED,
  DATE_INCORRECT,
  DATE_CONFLICTS,
  START_REQUIRED,
  END_REQUIRED,
} from '../helpers/Messages';
import Register from '../database';

export default class Validation {

  static date(date: string) {
    const dateRegex = /^([0-3][0-9])-([0-1][0-9])-([1-2][9|0][9|0|1|2][0-9])$/;
    return dateRegex.test(date);
  }

  static time(time: string) {
    const timeRegex = /^([0-1]?[0-9]|2[0-9]):([0-5][0-9])$/;
    return timeRegex.test(time);
  }

  static isoDate(date: string) {
    const data = date.split('-');
    return new Date(+data[2], +data[1] - 1, +data[0]);
  }

  static notToday(date: string): boolean {
    const data = Validation.isoDate(date);
    if (data < (new Date())) return false;
    return true;
  }

  static interval(start: string, end: string): boolean {
    if (start == end) {
      return false;
    }
    const startTime = start.split(':');
    const endTime = end.split(':');
    if ((startTime[0] > endTime[0]) || ((startTime[0] == endTime[0]) && (startTime[1] > endTime[1]))) {
      return false;
    }
    return true;
  }
  static gt(time: string) {
    return moment.utc(time, "HH:mm")
  }
  static startTime(start1: string, end1: string, start2: string, end2: string) {
    let ST1 = moment.utc(start1, "HH:mm");
    let ST2 = moment.utc(start2, "HH:mm");
    let EN1 = moment.utc(end1, "HH:mm");
    let EN2 = moment.utc(end2, "HH:mm");
    if ((EN1 <= ST2) || (ST1 >= EN2)) return true;
    return false;
  }

  static conflicts(date: string, start: string, end: string) {
    const info = Register.read();
    const response = info
      .find((day: Rule) => ((day.day === date) && (!Validation.startTime(start, end, day.start, day.end))));
    return response;
  }

  static checkCreate(req: Request, _res: Response, next: NextFunction) {
    const { start, end, type, limitDay, weekdays, day } = req.body;
    if (!(Validation.time(start))) return next(new HttpException(StatusCode.BAD_REQUEST, START_TIME_INCORRECT, true));
    if (!(Validation.time(end))) return next(new HttpException(StatusCode.BAD_REQUEST, END_TIME_INCORRECT, true));
    if (!Validation.interval(start, end)) return next(new HttpException(StatusCode.BAD_REQUEST, ERROR_START_AFTER, true));

    switch (type) {
      case 'unique':
        if (!Validation.notToday(day)) return next(new HttpException(StatusCode.BAD_REQUEST, NOT_TODAY, true));
        if ((Validation.conflicts(day, start, end)) !== undefined) return next(new HttpException(StatusCode.BAD_REQUEST, DATE_CONFLICTS, true));
        break;
      case 'daily':
        if (!Validation.notToday(limitDay)) return next(new HttpException(StatusCode.BAD_REQUEST, NOT_TODAY, true));
        break;
      case 'weekly':
        if (!Array.isArray(weekdays)) return next(new HttpException(StatusCode.BAD_REQUEST, NOT_ARRAY, true));
        if (!Validation.notToday(limitDay)) return next(new HttpException(StatusCode.BAD_REQUEST, NOT_TODAY, true));
        break;
      default:
        return next(new HttpException(StatusCode.BAD_REQUEST, 'Dados incorretos', true));
    }
    next();
  }

  static checkDelete(req: Request, _res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(new HttpException(StatusCode.BAD_REQUEST, ID_REQUIRED, true));
    if (!Number.isInteger(+id)) return next(new HttpException(StatusCode.BAD_REQUEST, ID_NOT_NUMBER, true));
    next();
  }

  static checkLimit(req: Request, _res: Response, next: NextFunction) {
    const { limitDay } = req.body;
    if (!limitDay) return next(new HttpException(StatusCode.BAD_REQUEST, LIMIT_REQUIRED, true));
    if (!Validation.date(limitDay)) return next(new HttpException(StatusCode.BAD_REQUEST, DATE_INCORRECT, true));
    next();
  }
  static checkInterval(req: Request, _res: Response, next: NextFunction) {
    const { start, end } = req.body;
    if (!start) return next(new HttpException(StatusCode.BAD_REQUEST, START_REQUIRED, true));
    if (!end) return next(new HttpException(StatusCode.BAD_REQUEST, END_REQUIRED, true));
    next();
  }
}

