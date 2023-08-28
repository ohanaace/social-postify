import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreatePublicationDto) {
    return this.prisma.publication.create({
      data
    });
  }

  findAll() {
    return this.prisma.publication.findMany();
  }

  findOne(id: number) {
    return this.prisma.publication.findFirst({
      where: {
        id
      }
    });
  }

  update(id: number, data: UpdatePublicationDto) {
    return this.prisma.publication.update({
      data,
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return this.prisma.publication.delete({
      where: {
        id
      }
    });
  };

  findPublicationByMediaID(mediaId: number) {
    return this.prisma.publication.findFirst({
      where: {
        mediaId
      }
    });
  };

  findPublicationByPostID(postId: number) {
    return this.prisma.publication.findFirst({
      where: {
        postId
      }
    })
  }
}
