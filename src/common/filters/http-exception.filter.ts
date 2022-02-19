import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();

        const request = context.getRequest();
        const response = context.getResponse();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.getResponse() : exception;

        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message
        });

        this.logger.error(`HTTP Status: ${status}. Error message: ${JSON.stringify(message)}`);

    }
}