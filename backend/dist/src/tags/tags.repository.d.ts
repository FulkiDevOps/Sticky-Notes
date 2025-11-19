import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class TagsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Prisma.PrismaPromise<{
        name: string;
        id: number;
    }[]>;
    create(data: Prisma.TagCreateInput): Prisma.Prisma__TagClient<{
        name: string;
        id: number;
    }, never, import(".prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: number): Promise<{
        name: string;
        id: number;
    }>;
}
