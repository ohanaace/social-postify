import { PrismaService } from "../../src/prisma/prisma.service";
import { faker } from "@faker-js/faker";

export async function createPublication(prisma: PrismaService, mediaId: number, postId: number) {
    const data = {
        mediaId,
        postId,
        date: faker.date.soon()
    }
    return await prisma.publication.create({
        data
    })
}