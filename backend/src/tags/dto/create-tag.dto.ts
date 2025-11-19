import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}