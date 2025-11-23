// src\pipes\zod-validation-pipe.ts

import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        }))

        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: {
            name: 'ZodValidationError',
            details,
          },
        })
      }

      throw new BadRequestException('Validation failed')
    }
    return value
  }
}