import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Note, Prisma } from '@prisma/client';

@Injectable()
export class NotesRepository {
    constructor(private prisma: PrismaService) {}


    async create(data: Prisma.NoteCreateInput, tagIds?: number[]): Promise<Note> {
        return this.prisma.note.create({
            data: {
                ...data,
                tags: {
                    connect: tagIds?.map(id => ({ id }))
                }
            },
            include: { tags: true }
        });
    }

    async update(id: number, data: Prisma.NoteUpdateInput, tagIds?: number[]): Promise<Note> {
        return this.prisma.note.update({
            where: { id },
            data: {
                ...data,
                tags: {
                    set: tagIds?.map(id => ({ id }))
                }
            },
            include: { tags: true }
        });
    }


    async findAllActive(tagIds?: number[], filterBy?: string): Promise<Note[]> {
        const whereClause: Prisma.NoteWhereInput = {
            isArchived: false
        };

        if (filterBy === 'no_tags') {

            whereClause.tags = {
                none: {}
            };
        } else if (tagIds && tagIds.length > 0) {

            whereClause.AND = tagIds.map(id => ({
                tags: { some: { id: id } }
            }));
        }

        return this.prisma.note.findMany({
            where: whereClause,
            orderBy: { updatedAt: 'desc' },
            include: { tags: true }
        });
    }

    async findAllArchived(tagIds?: number[], filterBy?: string): Promise<Note[]> {
        const whereClause: Prisma.NoteWhereInput = {
            isArchived: true
        };

        if (filterBy === 'no_tags') {
            whereClause.tags = {
                none: {}
            };
        } else if (tagIds && tagIds.length > 0) {
            whereClause.AND = tagIds.map(id => ({
                tags: { some: { id: id } }
            }));
        }


        return this.prisma.note.findMany({
            where: whereClause,
            orderBy: { updatedAt: 'desc' },
            include: { tags: true }
        });
    }


    async findOne(id: number): Promise<Note | null> {
        return this.prisma.note.findUnique({
            where: { id },
            include: { tags: true }
        });
    }

    async remove(id: number): Promise<Note> {

        return this.prisma.note.delete({ where: { id } });
    }


}
