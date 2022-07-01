export default class HttpException {
  code: number;
  
  message: string;

  error: boolean;

  constructor(code: number, message: string, error: boolean) {
    this.code = code;
    this.message = message;
    this.error = error;
  }
}
