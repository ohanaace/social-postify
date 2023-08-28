import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
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
  const parseId = parseInt(id)
    return await this.mediaService.findOne(parseId);
  }

  @Put(':id')
 async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
  const parseId = parseInt(id)  
  return await this.mediaService.update(parseId, updateMediaDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
  const parseId = parseInt(id)
    return await this.mediaService.remove(parseId);
  }
}
