import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
 async create(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediaService.create(createMediaDto);
  }

  @Get()
 async findAll() {
    return await this.mediaService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    return await this.mediaService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return await this.mediaService.update(+id, updateMediaDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    return await this.mediaService.remove(+id);
  }
}
