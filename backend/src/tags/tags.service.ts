import { Injectable } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(private readonly repository: TagsRepository) {}

    findAll() {
        return this.repository.findAll();
    }

    create(createTagDto: CreateTagDto) {
        return this.repository.create(createTagDto);
    }

    async remove(id: number) {
        return this.repository.remove(id);
    }
}