import { PrismaService } from "../../src/prisma/prisma.service";
import { faker } from "@faker-js/faker";

export async function createMedias(prisma: PrismaService) {
    const medias = [
        {
            title: faker.company.name(),
            username: faker.person.fullName()
        },
        {
            title: faker.company.name(),
            username: faker.person.fullName()
        },
        {
            title: faker.company.name(),
            username: faker.person.fullName()
        }
    ]
    return await prisma.media.createMany({
        data: medias
    });
};

export async function createOneMedia(prisma: PrismaService) {
    const data = {
        title: faker.company.name(),
        username: faker.person.fullName()
    }
    return await prisma.media.create({
        data
    })
}