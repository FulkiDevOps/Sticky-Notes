import React, { useState } from 'react';
import { createNote, type CreateNoteDto, type Tag } from '../services/api';
import { getTagColorClass } from "../utils/color.ts";

interface NoteFormProps {
    onNoteCreated: () => void;
    allTags: Tag[];
    onCreateTag: (name: string) => Promise<Tag | null>;
    onDeleteTag: (tagId: number) => Promise<void>;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onNoteCreated, allTags, onCreateTag, onDeleteTag }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleDeleteTagClick = (e: React.MouseEvent, tagId: number) => {
        e.stopPropagation();
        onDeleteTag(tagId);
    };

    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [newTagName, setNewTagName] = useState("");

    const handleToggleTag = (tagId: number) => {
        if (selectedTagIds.includes(tagId)) {
            setSelectedTagIds(prev => prev.filter(id => id !== tagId));
        } else {
            setSelectedTagIds(prev => [...prev, tagId]);
        }
    };

    const handleCreateAndSelectTag = async () => {
        if (!isAddingTag) {
            setIsAddingTag(true);
            return;
        }

        const newTag = await onCreateTag(newTagName);
        if (newTag) {
            setSelectedTagIds(prev => [...prev, newTag.id]);
            setNewTagName("");
            setIsAddingTag(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Title is required.');
            return;
        }

        const newNote: CreateNoteDto = {
            title,
            content: content || undefined,
            tagIds: selectedTagIds
        };

        try {
            setError(null);
            await createNote(newNote);
            setTitle('');
            setContent('');
            setSelectedTagIds([]);
            onNoteCreated();
        } catch (err) {
            console.error('Error creating note:', err);
            setError('Could not create note.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="sticky-note editing">
            {error && <p style={{ color: '#e06c75' }}>{error}</p>}

            <div className="selected-tag-list">
                {allTags
                    .filter(tag => selectedTagIds.includes(tag.id))
                    .map(tag => (
                        <span key={tag.id} className={`selected-tag tag-base ${getTagColorClass(tag.id)}`}>
                            {tag.name}
                            <button type="button" onClick={() => handleToggleTag(tag.id)}>x</button>
                        </span>
                    ))}
            </div>

            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                required
            />

            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                rows={10}
            />

            <div className="tag-picker">

                {allTags
                    .filter(tag => !selectedTagIds.includes(tag.id))
                    .map(tag => (
                        <div
                            key={tag.id}

                            className={`tag-picker-tag tag-base ${getTagColorClass(tag.id)}`}
                            onClick={() => handleToggleTag(tag.id)}

                        >
                            {tag.name}
                            <button
                                type="button"
                                className="tag-picker-delete-button"
                                onClick={(e) => handleDeleteTagClick(e, tag.id)}
                            >
                                x
                            </button>
                        </div>
                    ))}

                {!isAddingTag && (
                    <button
                        type="button"
                        className="tag-picker-tag new"
                        onClick={handleCreateAndSelectTag}
                    >
                        + New
                    </button>
                )}

                {isAddingTag && (
                    <div className="tag-creator">
                        <input
                            type="text"
                            placeholder="Tag name..."
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            autoFocus
                        />
                        <button type="button" onClick={handleCreateAndSelectTag}>✓</button>
                        <button type="button" onClick={() => setIsAddingTag(false)} style={{background: '#ccc'}}>X</button>
                    </div>
                )}
            </div>

            <div className="note-buttons">
                <button type="submit" className="button button-primary">
                    Save Note
                </button>
            </div>
        </form>
    );
};