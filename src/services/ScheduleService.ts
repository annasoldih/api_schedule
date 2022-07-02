import Register from '../database/index';

export default class ScheduleService {
  static get() {
    return Register.read();
  }
}