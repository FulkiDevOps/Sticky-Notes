import { PrismaService } from '../prisma/prisma.service';
import { Note, Prisma } from '@prisma/client';
export declare class NotesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.NoteCreateInput, tagIds?: number[]): Promise<Note>;
    update(id: number, data: Prisma.NoteUpdateInput, tagIds?: number[]): Promise<Note>;
    findAllActive(tagIds?: number[], filterBy?: string): Promise<Note[]>;
    findAllArchived(tagIds?: number[], filterBy?: string): Promise<Note[]>;
    findOne(id: number): Promise<Note | null>;
    remove(id: number): Promise<Note>;
}
