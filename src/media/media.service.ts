import { Body, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}
 async create(@Body() body: CreateMediaDto) {
    return await this.mediaRepository.create(body);
  }

  async findAll() {
    return await this.mediaRepository.findAll();
  }

  async findOne(id: number) {
    return await this.mediaRepository.findOne(id);
  }

 async update(id: number, @Body() body: UpdateMediaDto) {
    return await this.mediaRepository.update(id, body);
  }

 async remove(id: number) {
    return await this.mediaRepository.remove(id);
  }
}
