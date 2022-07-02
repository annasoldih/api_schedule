import Register from '../database/index';
import Validation from '../helpers/Validation';
import moment from 'moment';

export default class CreateRuleService {
  static addDay(start: string, end: string, day: string) {
    const data = Register.read();
    data.push({
      'id': Register.setId(),
      'day': day,
      'start': start,
      'end': end,
    });
    return data;
  }

  static create(
    start: string,
    end: string,
    type: string,
    limitDay: string,
    weekdays: string[],
    day: string
  ) {
    if (type === 'unique') {
      const unique = this.addDay(start, end, day);
      Register.write(unique);
    } else {
      let limitDate = Validation.isoDate(limitDay);
      for (let today = new Date(); moment(today) <= moment(limitDate).add("days", 1); today.setDate(today.getDate() + 1)) {
        let _day = today.getDate();
        let _month = today.getMonth() + 1;
        let vday = `${_day < 10 ? `0${_day.toString()}` : _day.toString()}-${_month < 10 ? `0${_month.toString()}` : _month.toString()}-${today.getFullYear()}`;
        if (!Validation.conflicts(vday, start, end)) {
          if ((type === 'daily') || ((type === 'weekly') && (weekdays.some((wd) => +wd == today.getDay())))) {
            const unique = this.addDay(start, end, vday);
            Register.write(unique);
          }
        }
      }
    }
    return Register.read();
  }
}
