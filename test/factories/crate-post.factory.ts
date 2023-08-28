import { PrismaService } from "../../src/prisma/prisma.service";
import { faker } from "@faker-js/faker";

export async function createPost(prisma: PrismaService) {
    const data = {
        title: faker.lorem.sentence(),
        text: faker.lorem.paragraph()
    }
    return prisma.post.create({
        data
    })
}