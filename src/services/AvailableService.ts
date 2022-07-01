import { Rule } from './../entities/interfaces';
import Register from '../database/index';
import Validation from '../helpers/Validation';

export default class AvailableService {
  static get(startDate:string, endDate: string) {
    let start = Validation.isoDate(startDate);
    let end = Validation.isoDate(endDate);
    let info = Register.read();

    return info.filter((rule: Rule) => {
      let day = Validation.isoDate(rule.day);
      return ((day >= start) && (day <= end));
    });
  }
}