import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagsRepository {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.tag.findMany({
            orderBy: { name: 'asc' },
        });
    }

    create(data: Prisma.TagCreateInput) {
        return this.prisma.tag.create({
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.tag.delete({
            where: { id },
        });
    }
}