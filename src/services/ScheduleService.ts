import Register from '../database/index';

export default class ScheduleService {
  static get() {
    Register.res()
    return Register.read();
  }
}