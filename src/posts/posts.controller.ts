import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  async create(@Body() body: CreatePostDto) {
    return await this.postsService.create(body);
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const parseId = parseInt(id)
    return await this.postsService.findOne(parseId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    const parseId = parseInt(id)
    return await this.postsService.update(parseId, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const parseId = parseInt(id)
    return await this.postsService.remove(parseId);
  }
}
