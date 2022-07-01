import { Rule } from './../entities/interfaces';
import Register from '../database/index';

export default class DeleteRuleService {
  static delete(id: number) {
    let info = Register.read();
    let rule = info.find((one: Rule) => one.id == +id);
    console.log(rule);
    let index = info.indexOf(rule);
    if (index !== -1) {
      info.splice(index, 1);
    }
    Register.write(info);
    return Register.read();
  }
}
