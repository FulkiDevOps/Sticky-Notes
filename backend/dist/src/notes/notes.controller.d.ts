import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(createNoteDto: CreateNoteDto): Promise<{
        id: number;
        title: string;
        content: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllActive(tagIds?: string, filterBy?: string): Promise<{
        id: number;
        title: string;
        content: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllArchived(tagIds?: string, filterBy?: string): Promise<{
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
