import { Module } from '@nestjs/common';
import { ApiSurfaceModule } from '../api-surface/api-surface.module';
import { AttachmentController } from './attachment.controller';

@Module({
  imports: [ApiSurfaceModule],
  controllers: [AttachmentController],
})
export class AttachmentModule {}
