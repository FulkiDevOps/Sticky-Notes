

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagsService.create(createTagDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tagsService.remove(id);
    }

}