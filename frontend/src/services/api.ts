// frontend/src/services/api.ts
import axios from 'axios';

// --- 1. NUEVA INTERFAZ "Tag" ---
export interface Tag {
    id: number;
    name: string;
}

// --- 2. INTERFAZ "Note" (ACTUALIZADA) ---
export interface Note {
    id: number;
    title: string;
    content: string | null;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    tags: Tag[]; // <-- AÑADIDO: Ahora las notas traen sus tags
}

// --- 3. DTOS (ACTUALIZADOS) ---
export type CreateNoteDto = {
    title: string;
    content?: string;
    tagIds?: number[]; // <-- AÑADIDO
};

export type UpdateNoteDto = {
    title?: string;
    content?: string;
    isArchived?: boolean;
    tagIds?: number[]; // <-- AÑADIDO
};

// ... (apiClient sigue igual) ...
const apiClient = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

// --- 4. FUNCIONES DE NOTAS (ACTUALIZADAS) ---

// Ahora aceptan un tagId opcional
export const getActiveNotes = async (tagIds: number[], filterNoTags: boolean) => {
    const params: any = {};

    if (filterNoTags) {
        params.filterBy = 'no_tags'; // <-- 1. ENVÍA EL NUEVO FILTRO
    } else if (tagIds.length > 0) {
        params.tagIds = tagIds.join(',');
    }

    const res = await apiClient.get<Note[]>('/notes/active', { params });
    return res.data;
};

export const getArchivedNotes = async (tagIds: number[], filterNoTags: boolean) => {
    const params: any = {};

    if (filterNoTags) {
        params.filterBy = 'no_tags'; // <-- 2. ENVÍA EL NUEVO FILTRO
    } else if (tagIds.length > 0) {
        params.tagIds = tagIds.join(',');
    }

    const res = await apiClient.get<Note[]>('/notes/archived', { params });
    return res.data;
};

// ... (createNote, updateNote, deleteNote, etc. ya están listos
//     porque el backend maneja los tagIds si los enviamos) ...
export const createNote = async (data: CreateNoteDto) => {
    const res = await apiClient.post<Note>('/notes', data);
    return res.data;
};

export const updateNote = async (id: number, data: UpdateNoteDto) => {
    const res = await apiClient.patch<Note>(`/notes/${id}`, data);
    return res.data;
};

export const deleteNote = (id: number) => apiClient.delete(`/notes/${id}`);
export const archiveNote = (id: number) => updateNote(id, { isArchived: true });
export const unarchiveNote = (id: number) => updateNote(id, { isArchived: false });

// --- 5. NUEVAS FUNCIONES DE TAGS ---
export const getTags = async () => {
    const res = await apiClient.get<Tag[]>('/tags');
    return res.data;
};

export const createTag = async (name: string) => {
    const res = await apiClient.post<Tag>('/tags', { name });
    return res.data;
};

export const deleteTag = (id: number) => apiClient.delete(`/tags/${id}`);