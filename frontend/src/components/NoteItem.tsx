import React, { useState } from 'react';
import { type Note, type Tag, type UpdateNoteDto, updateNote, deleteNote, archiveNote, unarchiveNote } from '../services/api';
import { getTagColorClass } from "../utils/color.ts";

interface NoteItemProps {
    note: Note;
    onActionComplete: () => void;
    allTags: Tag[];
    onCreateTag: (name: string) => Promise<Tag | null>;
    onDeleteTag: (tagId: number) => Promise<void>;
    onTagFilterClick: (tagId: number) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onActionComplete, allTags, onCreateTag, onDeleteTag, onTagFilterClick }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDeleteTagClick = (e: React.MouseEvent, tagId: number) => {
        e.stopPropagation();
        onDeleteTag(tagId);
    };

    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content || '');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
        note.tags.map(tag => tag.id)
    );

    const [isAddingTag, setIsAddingTag] = useState(false);
    const [newTagName, setNewTagName] = useState("");

    const handleDelete = async () => {
        {
            try {
                await deleteNote(note.id);
                onActionComplete();
            } catch (err) {
                console.error('Error deleting note:', err);
                alert('The note could not be deleted.');
            }
        }
    };

    const handleToggleArchive = async () => {
        try {
            if (note.isArchived) {
                await unarchiveNote(note.id);
            } else {
                await archiveNote(note.id);
            }
            onActionComplete();
        } catch (err) {
            console.error('Error archiving note:', err);
            alert('It was not possible to archive/unarchive the note.');
        }
    };

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

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData: UpdateNoteDto = {
            title: editTitle,
            content: editContent,
            tagIds: selectedTagIds,
        };
        try {
            await updateNote(note.id, updatedData);
            setIsEditing(false);
            onActionComplete();
        } catch (err) {
            console.error('Error updating note:', err);
            alert('Could not update note.');
        }
    };

    if (isEditing) {
        return (
            <form onSubmit={handleEditSubmit} className="sticky-note editing">
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

                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={8} />

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
                    <button type="submit" className="button button-primary">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="button">Cancel</button>
                </div>
            </form>
        );
    }

    return (
        <div className="sticky-note">
            {note.tags && note.tags.length > 0 && (
                <div className="tag-list">
                    {note.tags.map(tag => (
                        <button
                            key={tag.id}
                            className={`tag-pill tag-base ${getTagColorClass(tag.id)}`}
                            onClick={() => onTagFilterClick(tag.id)}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="sticky-note-content">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
            </div>

            <div className="note-buttons">
                <button onClick={() => setIsEditing(true)} className="button button-secondary">Edit</button>
                <button onClick={handleDelete} className="button button-danger">Delete</button>
                <button onClick={handleToggleArchive} className="button">
                    {note.isArchived ? 'Unarchive' : 'Archive'}
                </button>
            </div>
        </div>
    );
};