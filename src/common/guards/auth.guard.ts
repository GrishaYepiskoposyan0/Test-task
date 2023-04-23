import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IRequest } from '../interfaces/custom-request.interface';
import { config } from '../config/env.config';

function getBearerToken(request: IRequest): string | null {
  if (!request.headers.authorization) {
    return null;
  }
  const [prefix, token] = request.headers.authorization.split(' ');
  if (prefix === 'Bearer') {
    return token;
  }
  return null;
}

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = getBearerToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: any = await jwt.verify(token, config.JWT_SECRET);
      request.user = {
        email: payload.email,
        phoneNumber: payload.phoneNumber,
      };
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
