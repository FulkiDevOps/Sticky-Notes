import { IsBoolean, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class UpdateNoteDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsBoolean()
    @IsOptional()
    isArchived?: boolean;

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    tagIds?: number[];

}