"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const notes_repository_1 = require("./notes.repository");
let NotesService = class NotesService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    create(createNoteDto) {
        const { tagIds, ...noteData } = createNoteDto;
        return this.repository.create(noteData, tagIds);
    }
    findAllActive(tagIdsString, filterBy) {
        const tagIds = tagIdsString
            ? tagIdsString.split(',').map(id => parseInt(id, 10))
            : undefined;
        return this.repository.findAllActive(tagIds, filterBy);
    }
    findAllArchived(tagIdsString, filterBy) {
        const tagIds = tagIdsString
            ? tagIdsString.split(',').map(id => parseInt(id, 10))
            : undefined;
        return this.repository.findAllArchived(tagIds, filterBy);
    }
    async update(id, updateNoteDto) {
        const note = await this.repository.findOne(id);
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        const { tagIds, ...noteData } = updateNoteDto;
        return this.repository.update(id, noteData, tagIds);
    }
    async remove(id) {
        const note = await this.repository.findOne(id);
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        return this.repository.remove(id);
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notes_repository_1.NotesRepository])
], NotesService);
//# sourceMappingURL=notes.service.js.map