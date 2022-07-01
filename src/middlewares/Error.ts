import { Request, Response, NextFunction } from 'express';

import StatusCode from '../entities/enums';
import HttpException from '../entities/errorClass';

function errorMiddleware(err: HttpException, _req: Request, res: Response, _next: NextFunction) {
  const code = err.code || StatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';
  res
    .status(code)
    .send({
      code,
      message,
    });
}

export default errorMiddleware;