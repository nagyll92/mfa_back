import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Reflector } from '@nestjs/core';

// noinspection JSUnusedLocalSymbols
interface ClassType<T> {
    // tslint:disable-next-line:callable-types
    new(): T;
}

@Injectable()
export class TransformProvidedInterceptor implements NestInterceptor {

    constructor(private readonly reflector: Reflector) {
    }

    intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
        const provides = this.reflector.get('provides', context.getHandler());
        if (provides) {
            return call$.handle().pipe(map(data => ({
                success: true,
                data: plainToClass(provides[0], data, { excludeExtraneousValues: true })
            })));
        }
        return call$.handle().pipe(map(data => ({ success: true, data })));
    }
}
