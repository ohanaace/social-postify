import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { cleanDB } from './utils/cleanDb';
import { createMedias, createOneMedia } from './factories/create-medias.factory';
import { CreateMediaDto } from '../src/media/dto/create-media.dto';
import { UpdateMediaDto } from '../src/media/dto/update-media.dto';
import { faker } from '@faker-js/faker';
import { createPublication } from './factories/create-publication.factory';
import { createPost } from './factories/crate-post.factory';

describe('MediaController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, PrismaModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        prisma = await moduleFixture.resolve(PrismaService);
        app.enableCors()
        app.useGlobalPipes(new ValidationPipe());
        await cleanDB(prisma)

        await app.init();
    });

    it('GET /medias => should respond with all medias', async () => {
        await createMedias(prisma);

        const response = await request(app.getHttpServer()).get('/medias')
        const { status, body } = response;
        expect(status).toBe(HttpStatus.OK);
        expect(body).toHaveLength(3)
        const media = body[0]

        expect(media).toEqual({
            id: expect.any(Number),
            title: expect.any(String),
            username: expect.any(String)
        });
    });

    it('GET /medias => should return an empty array if there is no media', async () => {
        const response = await request(app.getHttpServer()).get('/medias')
        const { status, body } = response;
        expect(status).toBe(HttpStatus.OK);
        expect(body).toEqual([])
    });

    it('POST /medias => should create a new media', async () => {
        const body: CreateMediaDto = {
            title: 'new social media',
            username: 'new username'
        };

        const response = await request(app.getHttpServer())
            .post('/medias')
            .send(body)

        const { status } = response;
        expect(status).toBe(HttpStatus.CREATED);
    });

    it('POST /medias => should respond with 400 if data is missing', async () => {
        const body: CreateMediaDto = {
            title: '',
            username: 'aaaa'
        };

        const response = await request(app.getHttpServer())
            .post('/medias')
            .send(body)

        const { status } = response;
        expect(status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /medias => should respond with status 409 if combination username and title are already registered', async () => {
        const media = await createOneMedia(prisma);
        const body: CreateMediaDto = {
            title: media.title,
            username: media.username
        };

        const response = await request(app.getHttpServer())
            .post('/medias')
            .send(body)

        const { status } = response;
        expect(status).toBe(HttpStatus.CONFLICT);
    });

    it('GET /medias/:id => should get one media based on ID', async () => {
        const media = await createOneMedia(prisma);

        const response = await request(app.getHttpServer()).get(`/medias/${media.id}`);

        const { status, body } = response;

        expect(status).toBe(HttpStatus.OK);
        expect(body).toEqual({
            id: media.id,
            title: media.title,
            username: media.username
        });
    });

    it('GET /medias/:id => should respond with status 404 if no results match the id', async () => {
        const response = await request(app.getHttpServer()).get('/entidade/99999');

        const { status } = response;

        expect(status).toBe(HttpStatus.NOT_FOUND);
    });

    it('PUT /medias/:id => should respond with status 409 when update violates unique rule', async () => {
        const existentMedia = await createOneMedia(prisma);
        const media = await createOneMedia(prisma);
        const body: UpdateMediaDto = {
            title: existentMedia.title,
            username: existentMedia.username
        };

        const response = await request(app.getHttpServer())
            .put(`/medias/${media.id}`)
            .send(body);

        const { status } = response;
        expect(status).toBe(HttpStatus.CONFLICT);
    });

    it('PUT /medias/:id => should update successfully', async () => {
        const media = await createOneMedia(prisma);
        const body: UpdateMediaDto = {
            title: faker.company.name(),
            username: faker.person.fullName()
        };

        const response = await request(app.getHttpServer())
            .put(`/medias/${media.id}`)
            .send(body);

        const { status } = response;
        expect(status).toBe(HttpStatus.OK);
    });

    it('DELETE /medias/:id => should delete successfully', async () => {
        const deletedMedia = await createOneMedia(prisma);
        const response = await request(app.getHttpServer())
            .delete(`/medias/${deletedMedia.id}`);
        const { status } = response;
        expect(status).toBe(HttpStatus.OK);
    });

    it('DELETE /medias/:id => should respond with status 403 if there is publication associating the id', async () => {
        const deletedMedia = await createOneMedia(prisma);
        const post = await createPost(prisma)
        const publication = await createPublication(prisma, deletedMedia.id, post.id);

        const response = await request(app.getHttpServer())
            .delete(`/medias/${deletedMedia.id}`);
        const { status } = response;
        expect(status).toBe(HttpStatus.FORBIDDEN);
    })
});