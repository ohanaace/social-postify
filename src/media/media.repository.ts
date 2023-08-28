import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { CreateMediaDto } from "./dto/create-media.dto";

Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(createMediaDto: CreateMediaDto) {
    return this.prisma.media.create({
      data: createMediaDto
    });
  };

  findAll() {
    return this.prisma.media.findMany();
  }

  findOne(id: number) {
    return this.prisma.media.findFirst({
      where: {
        id
      }
    });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.prisma.media.update({
      data: updateMediaDto,
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return this.prisma.media.delete({
      where: {
        id
      }
    });
  };
};