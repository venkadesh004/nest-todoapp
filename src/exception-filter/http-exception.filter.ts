import {
  ExceptionFilter,
  Logger,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.log(
      `${request.method} ${request.originalUrl} ${status} error: ${exception.message}`,
    );

    const errorDetails = exception.getResponse();

    response.status(status).json({ error: true, errorDetails });
  }
}
