import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { TokenPayload } from './jwt-strategy'

export const UserAuthenticated = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as TokenPayload
  },
)