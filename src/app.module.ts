import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MediaModule } from './media/media.module';
import { PostsModule } from './posts/posts.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [PrismaModule, MediaModule, PostsModule, PublicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
