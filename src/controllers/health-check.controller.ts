import { Body, Controller, Get, UsePipes } from "@nestjs/common";
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { PrismaService } from "src/prisma/prisma.service";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";

@Controller('/health-check')
export class HealthCheckController {

    constructor(private prisma: PrismaService) {}
    
    @Get()
    async handle() {
        return {
            status: 'OK',
        }
    }
}