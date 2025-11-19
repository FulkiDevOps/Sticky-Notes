import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post()
    create(@Body() createNoteDto: CreateNoteDto) {
        return this.notesService.create(createNoteDto);
    }

    @Get('active')
    findAllActive(
        @Query('tagIds') tagIds?: string,
        @Query('filterBy') filterBy?: string
    ) {
        return this.notesService.findAllActive(tagIds, filterBy);
    }

    @Get('archived')
    findAllArchived(
        @Query('tagIds') tagIds?: string,
        @Query('filterBy') filterBy?: string
    ) {
        return this.notesService.findAllArchived(tagIds, filterBy);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateNoteDto: UpdateNoteDto,
    ) {
        return this.notesService.update(id, updateNoteDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.notesService.remove(id);
    }
}