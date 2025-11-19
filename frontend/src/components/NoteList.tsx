import React from 'react';
import { type Note, type Tag } from '../services/api';
import { NoteItem } from './NoteItem';

interface NoteListProps {
    notes: Note[];
    onActionComplete: () => void;
    allTags: Tag[];
    onCreateTag: (name: string) => Promise<Tag | null>;
    onDeleteTag: (tagId: number) => Promise<void>;
    onTagFilterClick: (tagId: number) => void;
}

export const NoteList: React.FC<NoteListProps> = ({
                                                      notes,
                                                      onActionComplete,
                                                      allTags,
                                                      onCreateTag,
                                                      onDeleteTag,
                                                      onTagFilterClick
                                                  }) => {

    if (notes.length === 0) {
        return <p>No notes found.</p>;
    }

    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onActionComplete={onActionComplete}
                    allTags={allTags}
                    onCreateTag={onCreateTag}
                    onDeleteTag={onDeleteTag}
                    onTagFilterClick={onTagFilterClick}
                />
            ))}
        </div>
    );
};