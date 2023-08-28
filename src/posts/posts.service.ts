import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { PublicationsService } from 'src/publications/publications.service';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository,
    @Inject(forwardRef(() => PublicationsService))
    private readonly publicationsService: PublicationsService) {}
  async create(body: CreatePostDto) {
    return await this.postsRepository.create(body);
  }

  async findAll() {
    const posts = await this.postsRepository.findAll();
    const formattedPosts = posts?.map((post) => {
      if(!post.image) {
        delete post.image
      }
      return post;
    } );
    return formattedPosts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);
    if(!post) throw new NotFoundException('Post does not exist!');
    if(!post.image) delete post.image;
    return post;
  }

  async update(id: number, body: UpdatePostDto) {
    await this.findOne(id);
    return await this.postsRepository.update(id, body);
  }

  async remove(id: number) {
    await this.findOne(id);
    const publishedPost = await this.publicationsService.findPublicationByPostID(id);
    if(publishedPost) throw new ForbiddenException();
    return await this.postsRepository.remove(id);
  }
}
