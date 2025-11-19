// backend/src/notes/dto/create-note.dto.ts
import { IsArray, IsNumber, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    tagIds?: number[];

}