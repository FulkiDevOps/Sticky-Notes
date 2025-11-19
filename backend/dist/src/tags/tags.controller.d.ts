import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
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
