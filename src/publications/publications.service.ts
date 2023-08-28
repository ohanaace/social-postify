import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { MediaService } from '../media/media.service';
import { PostsService } from '../posts/posts.service';
import { isBefore } from 'date-fns';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationsRepository: PublicationsRepository,
    @Inject(forwardRef(() => MediaService)) private readonly mediaService: MediaService,
    @Inject(forwardRef(() => PostsService)) private readonly postsService: PostsService
  ) { }
  async create(body: CreatePublicationDto) {
    await this.confirmMediaAndPost(body);
    return await this.publicationsRepository.create(body);
  }

  async findAll() {
    return await this.publicationsRepository.findAll();
  }

  async findOne(id: number) {
    const publication = await this.publicationsRepository.findOne(id);
    if (!publication) throw new NotFoundException();
    return publication;
  }

  async update(id: number, body: UpdatePublicationDto) {
    const publication = await this.findOne(id);
    const { date } = publication;
    const time = new Date();
    if (!publication) throw new NotFoundException();
    if(isBefore(date, time)) throw new ForbiddenException('Post has already been published!');
    await this.confirmMediaAndPost(body);
    
    return await this.publicationsRepository.update(id, body);
  }

  async remove(id: number) {
    await this.findOne(id);
    
    return await this.publicationsRepository.remove(id);
  }

  async findPublicationByMediaID(mediaId: number) {
    return await this.publicationsRepository.findPublicationByMediaID(mediaId)
  }
  async findPublicationByPostID(postId: number) {
    return await this.publicationsRepository.findPublicationByPostID(postId);
  };

  async confirmMediaAndPost(body: CreatePublicationDto | UpdatePublicationDto) {
    const { mediaId, postId } = body;
    const mediaID = await this.mediaService.findOne(mediaId);
    const postID = await this.postsService.findOne(postId);
    if (!mediaID || !postID) throw new NotFoundException();
  }
}
