import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { ConfigService } from '@nestjs/config'
import { z } from 'zod'
import { Injectable } from '@nestjs/common'

const tokenPayloadSchema = z.object({
  sub: z.uuid(),
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  // validar se o payload do token possui as informações necessárias para a aplicação
  async validate(token: TokenPayload) {
    return tokenPayloadSchema.parse(token)
  }
}
