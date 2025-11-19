import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';
export declare class TagsService {
    private readonly repository;
    constructor(repository: TagsRepository);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
    }[]>;
    create(createTagDto: CreateTagDto): import("@prisma/client").Prisma.Prisma__TagClient<{
        name: string;
        id: number;
    }, never, import(".prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): Promise<{
        name: string;
        id: number;
    }>;
}
