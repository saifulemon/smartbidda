import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';

import { Roles } from '../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { LearningContent } from '../learning-content/learning-content.entity';
import { ApiSurfaceService } from './api-surface.service';

@ApiTags('content')
@Controller('content')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'teacher')
export class ContentController {
  constructor(private readonly svc: ApiSurfaceService) {}

  @Get()
  @ApiOperation({ summary: 'List learning content (authoring)' })
  async list() {
    return this.svc.contentList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read one content item' })
  async get(@Param('id') id: string) {
    return this.svc.contentGet(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a content item' })
  async create(@Body() body: DeepPartial<LearningContent>) {
    return this.svc.contentCreate(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a content item' })
  async update(@Param('id') id: string, @Body() body: DeepPartial<LearningContent>) {
    return this.svc.contentUpdate(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft-delete a content item' })
  async remove(@Param('id') id: string) {
    return this.svc.contentDelete(id);
  }
}
