import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { verify } from 'jsonwebtoken'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { ENVS } from '@/main/configs'
import { Logger } from '@/shared/utils/logger.util'

type TokenPayload = {
  sub: number
  id: String
}

@Injectable()
export class AuthGuard implements CanActivate {
  logSource: string = ''

  constructor() {
    this.logSource = 'AuthGuard.canActive'
  }

  canActivate (
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const bearerToken = request.headers.authorization

    if (!bearerToken) {
      Logger.logError(this.logSource, 'Missing token')
      throw new UnauthorizedException()
    }

    const splittedToken = bearerToken.split(' ')

    const token = splittedToken.length > 0 ? splittedToken[1] : splittedToken[0]

    let payload = null

    try {
      payload = verify(token, ENVS.JWT.SECRET) as unknown as TokenPayload
    } catch (err) {
      Logger.logError(this.logSource, `Invalid token: ${err.message}`)
      throw new UnauthorizedException()
    }

    if (!payload?.id) {
      Logger.logError(this.logSource, 'Invalid token payload')
      throw new UnauthorizedException()
    }

    return true
  }
}
