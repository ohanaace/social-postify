import { PrismaService } from "../../src/prisma/prisma.service";
export async function cleanDB(prisma: PrismaService) {
    await prisma.publication.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.media.deleteMany({});
}