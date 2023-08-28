import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationsModule } from '../publications/publications.module';
import { MediaModule } from '../media/media.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  imports: [forwardRef(() => PublicationsModule), forwardRef(() => MediaModule), PrismaModule],
  exports: [PostsService]
})
export class PostsModule {}
