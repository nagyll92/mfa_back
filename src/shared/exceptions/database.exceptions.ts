import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from 'utils/logger/logger';

const MapDbExceptionsToHTTPExceptions = (exception) => {
    const [code, message] = exception.split(':');
    AppLogger.error(`DB EXCEPTION [${code}]`, exception);
    switch (code) {
        case 'ER_DUP_ENTRY':
            throw new BadRequestException(message.trim());
        case 'ER_NO_REFERENCED_ROW_2': {
            throw new BadRequestException(message.trim());
        }
        default:
            AppLogger.error(`UNKOWN DB EXCEPTION [${code}]`, exception);
            throw new InternalServerErrorException();
    }
};

export const CatchDBExceptions = (target, key, descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args) {
        try {
            return await originalMethod.apply(this, args);
        } catch (error) {
            MapDbExceptionsToHTTPExceptions(error.message);
        }
    };

    return descriptor;

};
