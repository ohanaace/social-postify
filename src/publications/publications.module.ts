import { Module, forwardRef } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationsRepository } from './publications.repository';
import { MediaModule } from '../media/media.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationsRepository],
  imports: [forwardRef(() => MediaModule), forwardRef(() => PostsModule), PrismaModule],
  exports: [PublicationsService]
})
export class PublicationsModule {}
