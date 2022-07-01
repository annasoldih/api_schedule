import { Rule, interv } from './../entities/interfaces';
import * as fs from 'fs';
import * as path from 'path';

const file = 'file.json';

export default class Register {
  static read() {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, file), 'utf8'));
  }

  static write(data: any) {
    fs.writeFileSync(path.resolve(__dirname, file), JSON.stringify(data));
  }

  static setId() {
    const data = this.read();
    return (data.length > 0) ? data[data.length - 1].id + 1 : 1;
  }
}
