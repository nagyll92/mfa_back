import { Logger } from '@nestjs/common';

class CustomLogger {
    private logger = new Logger('AppLogger');

    // noinspection JSUnusedGlobalSymbols
    public debug(message: string, payload?: any) {
        const messageToLog = message + this.parseMessages(payload);
        this.logger.debug(messageToLog);
    }

    public log(message: string, payload?: any) {
        const messageToLog = message + this.parseMessages(payload);
        this.logger.log(messageToLog);
    }

    // noinspection JSUnusedGlobalSymbols
    public warn(message: string, payload?: any) {
        const messageToLog = message + this.parseMessages(payload);
        this.logger.warn(messageToLog);
    }

    public error(message: string, trace?: any, payload?: any) {
        const messageToLog = message + this.parseMessages(payload);
        this.logger.error(messageToLog, trace);
    }

    private parseMessages(payload?: any): string {
        if (typeof payload === 'undefined') {
            return '';
        }

        if (payload === null) {
            return ' null';
        }

        if (typeof payload === 'function') {
            return ' ' + payload.toString();
        }

        if (typeof payload === 'number') {
            return ' ' + payload.toString();
        }

        if (typeof payload === 'object') {
            return ' ' + JSON.stringify(payload);
        }

        if (typeof payload === 'string') {
            return ' ' + payload;
        }

        return ' CANNOT SERIALIZE THE PAYLOAD';
    }

}

export const AppLogger = new CustomLogger();
