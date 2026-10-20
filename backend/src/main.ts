import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// Default import works with esModuleInterop. `import * as` produces a namespace
// whose typeof has no call signatures under strict TS — caused TS2349 in v35/v37.
import cookieParser from 'cookie-parser';
import express from 'express';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';
import { validationPipe } from './core/pipes/validation.pipe';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { AllExceptionsFilter } from './core/filters/all-exceptions.filter';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { envConfigService } from './config/env-config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // TODO: CUSTOMIZE — Change global prefix if needed
    app.setGlobalPrefix('api');

    // Cookie parser — required for httpOnly cookie auth
    app.use(cookieParser());

    // Uploaded lesson media / voice-overs. The attachment controller writes here;
    // serving the directory makes the returned URL actually reachable.
    const uploadDir = process.env.UPLOAD_DIR || join(process.cwd(), 'uploads');
    mkdirSync(uploadDir, { recursive: true });
    app.use('/uploads', express.static(uploadDir));

    // CORS — credentials: true is required for cookies
    app.enableCors({
        origin: envConfigService.getOrigins(),
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Global pipes
    app.useGlobalPipes(validationPipe);

    // Global filters (order matters — AllExceptions first, HttpException second)
    app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

    // Global interceptors
    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new ClassSerializerInterceptor(app.get(Reflector)),
        new TransformInterceptor(),
    );

    // Swagger
    const cookieName =
        envConfigService.getAuthJWTConfig().AUTH_TOKEN_COOKIE_NAME;
    const config = new DocumentBuilder()
        // TODO: CUSTOMIZE — Update title and description for your project
        .setTitle('API')
        .setDescription('API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .addCookieAuth(cookieName)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    // TODO: CUSTOMIZE — Change Swagger docs path if needed
    SwaggerModule.setup('api/docs', app, document);

    const port = envConfigService.getPort();
    await app.listen(port);
}
bootstrap();
