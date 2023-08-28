import { Module, forwardRef } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationsModule } from '../publications/publications.module';
import { PublicationsRepository } from '../publications/publications.repository';

@Module({
  controllers: [MediaController],
  providers: [MediaService, MediaRepository, PublicationsRepository],
  imports: [forwardRef(() => PublicationsModule), PrismaModule],
  exports: [MediaService]
})
export class MediaModule {}
