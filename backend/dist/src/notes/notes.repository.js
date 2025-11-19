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
exports.NotesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotesRepository = class NotesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, tagIds) {
        return this.prisma.note.create({
            data: {
                ...data,
                tags: {
                    connect: tagIds?.map(id => ({ id }))
                }
            },
            include: { tags: true }
        });
    }
    async update(id, data, tagIds) {
        return this.prisma.note.update({
            where: { id },
            data: {
                ...data,
                tags: {
                    set: tagIds?.map(id => ({ id }))
                }
            },
            include: { tags: true }
        });
    }
    async findAllActive(tagIds, filterBy) {
        const whereClause = {
            isArchived: false
        };
        if (filterBy === 'no_tags') {
            whereClause.tags = {
                none: {}
            };
        }
        else if (tagIds && tagIds.length > 0) {
            whereClause.AND = tagIds.map(id => ({
                tags: { some: { id: id } }
            }));
        }
        return this.prisma.note.findMany({
            where: whereClause,
            orderBy: { updatedAt: 'desc' },
            include: { tags: true }
        });
    }
    async findAllArchived(tagIds, filterBy) {
        const whereClause = {
            isArchived: true
        };
        if (filterBy === 'no_tags') {
            whereClause.tags = {
                none: {}
            };
        }
        else if (tagIds && tagIds.length > 0) {
            whereClause.AND = tagIds.map(id => ({
                tags: { some: { id: id } }
            }));
        }
        return this.prisma.note.findMany({
            where: whereClause,
            orderBy: { updatedAt: 'desc' },
            include: { tags: true }
        });
    }
    async findOne(id) {
        return this.prisma.note.findUnique({
            where: { id },
            include: { tags: true }
        });
    }
    async remove(id) {
        return this.prisma.note.delete({ where: { id } });
    }
};
exports.NotesRepository = NotesRepository;
exports.NotesRepository = NotesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotesRepository);
//# sourceMappingURL=notes.repository.js.map