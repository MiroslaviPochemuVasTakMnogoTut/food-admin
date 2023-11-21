import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {Observable} from 'rxjs'

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const target = context.getHandler();
    const descriptor = context.getHandler();

    // ApiBearerAuth() (target, '', descriptor);

    return next.handle().pipe()
  }
} 