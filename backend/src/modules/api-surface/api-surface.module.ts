import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenModule } from '../../infrastructure/token/token.module';
import { SslcommerzClient } from '../../infrastructure/payment/sslcommerz.client';
import { Notifications } from '../notifications/notifications.entity';
import { QuestionsModule } from '../questions/questions.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';

import { ApiSurfaceService } from './api-surface.service';
import { AuthFlowController } from './auth-flow.controller';
import { StudentController } from './student.controller';
import { CurriculumController } from './curriculum.controller';
import { ExamFlowController, QuizFlowController } from './learning-flow.controller';
import { ParentController } from './parent.controller';
import { ContentController } from './content.controller';
import { PaymentsFlowController } from './payments-flow.controller';
import { NotificationsFlowController } from './notifications-flow.controller';
import { AdminController } from './admin.controller';

/**
 * ApiSurfaceModule — the business API described by PROJECT_API that is not
 * expressible as per-entity CRUD: auth flows, the student/parent experience,
 * curriculum delivery, quiz/exam lifecycle, payments and the admin console.
 *
 * It intentionally owns no entities of its own. It composes the repositories
 * that TypeOrmModule already knows (autoLoadEntities) through DataSource, so a
 * new endpoint does not require touching every entity module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Notifications]), TokenModule, QuestionsModule, SubscriptionsModule],
  controllers: [
    AuthFlowController,
    StudentController,
    CurriculumController,
    QuizFlowController,
    ExamFlowController,
    ParentController,
    ContentController,
    PaymentsFlowController,
    NotificationsFlowController,
    AdminController,
  ],
  providers: [ApiSurfaceService, SslcommerzClient],
  exports: [ApiSurfaceService],
})
export class ApiSurfaceModule {}
