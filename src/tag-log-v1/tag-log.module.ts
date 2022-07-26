import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PairInfo } from 'src/entities/pair-info.entity';
import { TagLog } from 'src/entities/tag-log.entity';
import { UserModule } from 'src/user/user.module';
import { UtilsModule } from 'src/utils/utils.module';
import { PairInfoRepository } from './repository/mysql/pair-info.repository';
import { TagLogRepository } from './repository/mysql/tag-log.repository';
import { TagLogAdminController } from './tag-log-admin.controller';
import { TagLogAdminService } from './tag-log-admin.service';
import { TagLogController } from './tag-log.controller';
import { TagLogService } from './tag-log.service';

const tagLogRepo = {
  provide: 'ITagLogRepository',
  useClass: TagLogRepository,
};

const pairInfoRepo = {
  provide: 'IPairInfoRepository',
  useClass: PairInfoRepository,
};

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([TagLog, PairInfo]),
    UtilsModule,
    UserModule,
  ],
  exports: [TypeOrmModule],
  controllers: [TagLogController, TagLogAdminController],
  providers: [tagLogRepo, pairInfoRepo, TagLogService, TagLogAdminService],
})
export class TagLogModule {}
