import { CustomInterceptor } from './custom.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';

export default [
    ErrorInterceptor,
    JwtInterceptor,
    CustomInterceptor
]
export * from './error.interceptor';
export * from './jwt.interceptor';
export * from './custom.interceptor';