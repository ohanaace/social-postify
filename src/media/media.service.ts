import { Body, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaRepository } from './media.repository';
import { PublicationsService } from '../publications/publications.service';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository,
   @Inject(forwardRef(() => PublicationsService))
   private readonly publicationsService: PublicationsService) { }
  async create(@Body() body: CreateMediaDto) {
    await this.verifyAccount(body);
    return await this.mediaRepository.create(body);
  }

  async findAll() {
    return await this.mediaRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediaRepository.findOne(id);
    if (!media) throw new NotFoundException();
    return media;
  }

  async update(id: number, @Body() body: UpdateMediaDto) {
    await this.findOne(id)
    await this.verifyAccount(body)
    return await this.mediaRepository.update(id, body);
  }

  async remove(id: number) {
    await this.findOne(id)
    const accountWithPubs = await this.publicationsService.findPublicationByMediaID(id);
    if (accountWithPubs) throw new ForbiddenException();
    return await this.mediaRepository.remove(id);
  }

  private async verifyAccount(body: CreateMediaDto | UpdateMediaDto) {
    const { title, username } = body
    const account = await this.mediaRepository.verifyAccount(title, username);
    if (account) throw new ConflictException(`Username ${username} is already used! Please, choose a valid username`);
  }
}
