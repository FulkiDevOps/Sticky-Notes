import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesService {
    private readonly repository;
    constructor(repository: NotesRepository);
    create(createNoteDto: CreateNoteDto): Promise<{
        id: number;
        title: string;
        content: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllActive(tagIdsString?: string, filterBy?: string): Promise<{
        id: number;
        title: string;
        content: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllArchived(tagIdsString?: string, filterBy?: string): Promise<{
        id: number;
        title: string;
        content: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    update(id: number, updateNoteDto: UpdateNoteDto): Promise<{
        id: number;
        title: string;
        content: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        content: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
