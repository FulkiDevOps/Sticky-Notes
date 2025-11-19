import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TagsRepository } from './tags.repository';

@Module({
    imports: [PrismaModule],
    controllers: [TagsController],
    providers: [TagsService, TagsRepository],
})
export class TagsModule {}