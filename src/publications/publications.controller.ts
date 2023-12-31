import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) { }

  @Post()
  async create(@Body() body: CreatePublicationDto) {
    return await this.publicationsService.create(body);
  }

  @Get()
  async findAll() {
    return await this.publicationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const parseId = parseInt(id);
    return await this.publicationsService.findOne(parseId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePublicationDto) {
    const parseId = parseInt(id);
    return await this.publicationsService.update(parseId, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const parseId = parseInt(id);
    return await this.publicationsService.remove(parseId);
  }
}
