import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { ApiSurfaceService } from '../api-surface/api-surface.service';

const UPLOAD_DIR = process.env.UPLOAD_DIR || join(process.cwd(), 'uploads');
mkdirSync(UPLOAD_DIR, { recursive: true });

/**
 * Attachment upload — real multipart handling (multer disk storage), not a
 * metadata-only API. Voice-over assets and lesson media arrive here; the
 * returned URL is what `vo_assets.audio_url` / `learning_content.video_url`
 * store.
 */
@ApiTags('attachments')
@Controller('attachments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'teacher')
export class AttachmentController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a media file (multipart/form-data, field "file")' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        assetKey: { type: 'string' },
        locale: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (_req, file, cb) => {
          cb(null, `${randomUUID()}${extname(file.originalname) || '.bin'}`);
        },
      }),
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  async upload(
    @UploadedFile()
    file: { filename: string; originalname: string; size: number; mimetype: string } | undefined,
    @Body() body: { assetKey?: string; locale?: string },
  ) {
    if (!file) throw new BadRequestException('A "file" part is required');
    const url = `/uploads/${file.filename}`;
    if (body.assetKey) {
      await this.svc.createVoiceAsset({
        assetKey: body.assetKey,
        audioUrl: url,
        locale: body.locale || 'bn',
      });
    }
    return {
      url,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Attachment service health' })
  health() {
    return { uploadDir: UPLOAD_DIR, maxSizeMb: 20 };
  }
}
