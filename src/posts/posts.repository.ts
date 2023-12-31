import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) { }
  create(data: CreatePostDto) {
    return this.prisma.post.create({
      data
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findFirst({
      where: {
        id
      }
    });
  }

  update(id: number, data: UpdatePostDto) {
    return this.prisma.post.update({
      data,
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id
      }
    });
  }
}
