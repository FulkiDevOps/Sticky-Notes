import { useState, useEffect } from 'react';
import { type Note, type Tag, getActiveNotes, getArchivedNotes, getTags, createTag, deleteTag } from './services/api';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import './App.css';
import { getTagColorClass } from './utils/color';
import { isAxiosError } from 'axios';
type View = 'active' | 'archived' | 'create';

function App() {
    const [activeNotes, setActiveNotes] = useState<Note[]>([]);
    const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [view, setView] = useState<View>('active');
    const [loading, setLoading] = useState(true);
    const [filterNoTags, setFilterNoTags] = useState(false);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [activeData, archivedData, tagsData] = await Promise.all([
                // 2. PASA AMBOS filtros a la API
                getActiveNotes(selectedTagIds, filterNoTags),
                getArchivedNotes(selectedTagIds, filterNoTags),
                getTags()
            ]);
            setActiveNotes(activeData);
            setArchivedNotes(archivedData);
            setTags(tagsData);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [selectedTagIds, filterNoTags]);

    const handleNoteCreated = () => {
        fetchAllData();
        setView('active');
        setSelectedTagIds([]);
    };
    const handleClearFilters = () => {
        setSelectedTagIds([]);
        setFilterNoTags(false);
    };

    const handleNoTagsFilter = () => {
        setSelectedTagIds([]);
        setFilterNoTags(true);
    };


    const handleTagFilter = (tagId: number) => {
        setFilterNoTags(false);
        setSelectedTagIds(prevIds => {
            if (prevIds.includes(tagId)) {
                return prevIds.filter(id => id !== tagId);
            } else {
                return [...prevIds, tagId];
            }
        });
    };

    const handleViewChange = (newView: View) => {
        setView(newView);
        handleClearFilters();
    };

    const handleCreateNewTag = async (name: string): Promise<Tag | null> => {
        if (!name || !name.trim()) return null;

        try {
            const newTag = await createTag(name.trim());
            setTags(prevTags => [...prevTags, newTag]);
            return newTag;
        } catch (err) {
            console.error("Error creating tag:", err);

            let errorMessage = "An unexpected error occurred."; // Mensaje por defecto

            if (isAxiosError(err)) {
                if (err.response && err.response.data && err.response.data.message) {
                    const backendMessage = err.response.data.message;

                    if (Array.isArray(backendMessage)) {
                        errorMessage = backendMessage.join(', ');
                    } else {
                        errorMessage = backendMessage;
                    }
                } else {
                    errorMessage = err.message;
                }
            } else if (err instanceof Error) {

                errorMessage = err.message;
            }

            alert(`Error: ${errorMessage}`);
            return null;
        }
    };

    const handleDeleteTag = async (tagId: number) => {

        try {
            await deleteTag(tagId);
            setSelectedTagIds(prev => prev.filter(id => id !== tagId));
            fetchAllData();
        } catch (err) {
            console.error("Error deleting tag:", err);
            alert("Could not delete tag.");
        }
    };

    return (
        <div className="app-container">
            <h1>My Sticky Notes</h1>

            <nav className="app-nav">
                <button
                    className={`nav-button ${view === 'active' ? 'active' : ''}`}
                    onClick={() => handleViewChange('active')}
                >
                    Active Notes ({activeNotes.length})
                </button>
                <button
                    className={`nav-button ${view === 'archived' ? 'active' : ''}`}
                    onClick={() => handleViewChange('archived')}
                >
                    Archived ({archivedNotes.length})
                </button>
                <button
                    className={`nav-button ${view === 'create' ? 'active' : ''}`}
                    onClick={() => handleViewChange('create')}
                >
                    + New Note
                </button>
            </nav>

            {view !== 'create' && (
                <div className="tag-filter-bar">

                    <button
                        className={`tag-filter-button all-tags ${selectedTagIds.length === 0 && !filterNoTags ? 'active' : ''}`}
                        onClick={handleClearFilters}
                    >
                        Clean Filters
                    </button>

                    <button
                        className={`tag-filter-button no-tags ${filterNoTags ? 'active' : ''}`}
                        onClick={handleNoTagsFilter}
                    >
                        No Tags Only
                    </button>

                    {tags.map(tag => {
                        const isActive = selectedTagIds.includes(tag.id) && !filterNoTags;
                        return (
                            <button
                                key={tag.id}
                                className={`tag-filter-button tag-base ${getTagColorClass(tag.id)} ${isActive ? 'active' : ''}`}
                                onClick={() => handleTagFilter(tag.id)}
                            >
                                <span>{tag.name}</span>
                            </button>
                        )
                    })}
                </div>
            )}

            {loading && <p>Loading...</p>}

            <div style={{ display: loading ? 'none' : 'block' }}>
                {view === 'active' && (
                    <NoteList
                        notes={activeNotes}
                        onActionComplete={fetchAllData}
                        allTags={tags}
                        onCreateTag={handleCreateNewTag}
                        onDeleteTag={handleDeleteTag}
                        onTagFilterClick={handleTagFilter}
                    />
                )}
                {view === 'archived' && (
                    <NoteList
                        notes={archivedNotes}
                        onActionComplete={fetchAllData}
                        allTags={tags}
                        onCreateTag={handleCreateNewTag}
                        onDeleteTag={handleDeleteTag}
                        onTagFilterClick={handleTagFilter}
                    />
                )}
                {view === 'create' && (
                    <NoteForm
                        onNoteCreated={handleNoteCreated}
                        allTags={tags}
                        onCreateTag={handleCreateNewTag}
                        onDeleteTag={handleDeleteTag}
                    />
                )}
            </div>
        </div>
    );
}

export default App;