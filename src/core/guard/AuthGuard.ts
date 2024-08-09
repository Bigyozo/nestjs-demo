import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TOKEN_PREFIX } from '../constant/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtservice: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (['/tokens'].includes(request.url)) {
      return true;
    }
    const token = this.extractTokenFromHeader(request);
    try {
      request['user'] = await this.jwtservice.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('wrong token !');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === TOKEN_PREFIX ? token : '';
  }
}
