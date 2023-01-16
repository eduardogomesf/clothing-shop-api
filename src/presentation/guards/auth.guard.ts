import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { verify } from 'jsonwebtoken'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { ENVS } from '@/main/configs'

type TokenPayload = {
  sub: number
  id: String
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate (
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const bearerToken = request.headers.authorization

    if (!bearerToken) {
      console.error('[AuthGuard.canActive] -> Missing token')
      throw new UnauthorizedException()
    }

    const splittedToken = bearerToken.split(' ')

    const token = splittedToken.length > 0 ? splittedToken[1] : splittedToken[0]

    let payload = null

    try {
      payload = verify(token, ENVS.SECRETS.JWT_SECRET) as unknown as TokenPayload
    } catch (err) {
      console.error('[AuthGuard.canActive] -> Invalid token: ' + err.message)
      throw new UnauthorizedException()
    }

    if (!payload?.id) {
      console.error('[AuthGuard.canActive] -> Invalid token payload')
      throw new UnauthorizedException()
    }

    return true
  }
}
