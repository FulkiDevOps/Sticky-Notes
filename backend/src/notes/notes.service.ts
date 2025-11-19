import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
    constructor(private readonly repository: NotesRepository) {}

    create(createNoteDto: CreateNoteDto) {
        const { tagIds, ...noteData } = createNoteDto;
        return this.repository.create(noteData, tagIds);
    }

    findAllActive(tagIdsString?: string, filterBy?: string) {
        const tagIds = tagIdsString
            ? tagIdsString.split(',').map(id => parseInt(id, 10))
            : undefined;
        return this.repository.findAllActive(tagIds, filterBy);
    }

    findAllArchived(tagIdsString?: string, filterBy?: string) {
        const tagIds = tagIdsString
            ? tagIdsString.split(',').map(id => parseInt(id, 10))
            : undefined;
        return this.repository.findAllArchived(tagIds, filterBy);
    }


    async update(id: number, updateNoteDto: UpdateNoteDto) {
        const note = await this.repository.findOne(id);
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        const { tagIds, ...noteData } = updateNoteDto;
        return this.repository.update(id, noteData, tagIds);
    }


    async remove(id: number) {
        const note = await this.repository.findOne(id);
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        return this.repository.remove(id);
    }
}