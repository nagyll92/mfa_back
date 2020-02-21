import { SetMetadata } from '@nestjs/common';

// type ClassType<T> = new() => T;

export const Provides = (...provides: any) => SetMetadata('provides', provides);
