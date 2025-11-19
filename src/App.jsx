import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'smart-notes-v1';

function generateSummary(text) {
  if (!text || text.trim().length === 0) return 'Nothing to summarize yet.';
  const cleaned = text.trim().replace(/\s+/g, ' '    </div>
  </div>
);
  if (cleaned.length <= 160) return cleaned;
  const slicePoint = 160;
  const periodIndex = cleaned.indexOf('.', 120    </div>
  </div>
);
  if (periodIndex !== -1 && periodIndex < 220) {
    return cleaned.slice(0, periodIndex + 1    </div>
  </div>
);
  }
  return cleaned.slice(0, slicePoint) + '...';
}

function parseTags(input) {
  if (!input) return [];
  return input
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0    </div>
  </div>
);
}

function App() {
  const [notes, setNotes] = useState([]    </div>
  </div>
);
  const [title, setTitle] = useState(''    </div>
  </div>
);
  const [content, setContent] = useState(''    </div>
  </div>
);
  const [tagsInput, setTagsInput] = useState(''    </div>
  </div>
);
  const [currentId, setCurrentId] = useState(null    </div>
  </div>
);
  const [search, setSearch] = useState(''    </div>
  </div>
);
  const [activeTag, setActiveTag] = useState('all'    </div>
  </div>
);
  const [summary, setSummary] = useState(''    </div>
  </div>
);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY    </div>
  </div>
);
      if (saved) setNotes(JSON.parse(saved)    </div>
  </div>
);
    } catch (err) {
      console.error('Failed to load notes:', err    </div>
  </div>
);
    }
  }, []    </div>
  </div>
);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)    </div>
  </div>
);
    } catch (err) {
      console.error('Failed to save notes:', err    </div>
  </div>
);
    }
  }, [notes]    </div>
  </div>
);

  const resetForm = () => {
    setTitle(''    </div>
  </div>
);
    setContent(''    </div>
  </div>
);
    setTagsInput(''    </div>
  </div>
);
    setCurrentId(null    </div>
  </div>
);
    setSummary(''    </div>
  </div>
);
  };

  const handleSave = () => {
    const trimmedTitle = title.trim() || 'Untitled note';
    const trimmedContent = content.trim(    </div>
  </div>
);

    if (!trimmedContent) {
      alert('Note content cannot be empty.'    </div>
  </div>
);
      return;
    }

    const tags = parseTags(tagsInput    </div>
  </div>
);
    const now = new Date().toISOString(    </div>
  </div>
);

    if (currentId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === currentId
            ? { ...n, title: trimmedTitle, content: trimmedContent, tags, updatedAt: now }
            : n
        )
          </div>
  </div>
);
    } else {
      const newNote = {
        id: Date.now().toString(),
        title: trimmedTitle,
        content: trimmedContent,
        tags,
        pinned: false,
        createdAt: now,
        updatedAt: now,
      };
      setNotes((prev) => [newNote, ...prev]    </div>
  </div>
);
    }

    resetForm(    </div>
  </div>
);
  };

  const handleEdit = (note) => {
    setCurrentId(note.id    </div>
  </div>
);
    setTitle(note.title    </div>
  </div>
);
    setContent(note.content    </div>
  </div>
);
    setTagsInput((note.tags || []).join(', ')    </div>
  </div>
);
    setSummary(''    </div>
  </div>
);
    window.scrollTo({ top: 0, behavior: 'smooth' }    </div>
  </div>
);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this note?')) return;
    setNotes((prev) => prev.filter((n) => n.id !== id)    </div>
  </div>
);
    if (currentId === id) resetForm(    </div>
  </div>
);
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
        </div>
  </div>
);
  };

  const handleSummarize = () => {
    setSummary(generateSummary(content)    </div>
  </div>
);
  };

  const allTags = Array.from(
    new Set(notes.flatMap((n) => n.tags || []))
  ).sort((a, b) => a.localeCompare(b)    </div>
  </div>
);

  const normalizedSearch = search.toLowerCase(    </div>
  </div>
);

  const filteredNotes = [...notes]
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return (
  <div
    style={{
      minHeight: "100vh",
      padding: "1.5rem",
      fontFamily: "system-ui, sans-serif",
      background: "#020617",
      color: "#e5e7eb",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div style={{ width: "100%", maxWidth: "1100px" }}>
b.updatedAt || '').localeCompare(a.updatedAt || ''    </div>
  </div>
);
    })
    .filter((note) => {
      if (activeTag !== 'all' && !(note.tags || []).includes(activeTag)) {
        return false;
      }
      if (!normalizedSearch) return true;
      const haystack =
        (note.title || '') +
        ' ' +
        (note.content || '') +
        ' ' +
        (note.tags || []).join(' '    </div>
  </div>
);
      return haystack.toLowerCase().includes(normalizedSearch    </div>
  </div>
);
    }    </div>
  </div>
);

  return (
  <div
    style={{
      minHeight: "100vh",
      padding: "1.5rem",
      fontFamily: "system-ui, sans-serif",
      background: "#020617",
      color: "#e5e7eb",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div style={{ width: "100%", maxWidth: "1100px" }}>

    <div style={{ minHeight: '100vh', padding: '1.5rem', fontFamily: 'system-ui, sans-serif', background: '#020617', color: '#e5e7eb' }}>
      <header style={{ marginBottom: '1rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.6rem' }}>Smart Notes</h1>
        <p style={{ margin: '0.25rem 0', color: '#9ca3af' }}>
          Notes with tags, search, pins & a fake AI summary.
        </p>
      </header>

      <main style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)' }}>
        {/* Left: form */}
        <section style={{ padding: '1rem', borderRadius: '0.75rem', background: '#020617', border: '1px solid #1f2937' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ margin: 0, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af' }}>
              {currentId ? 'Edit note' : 'New note'}
            </h2>
            {currentId && (
              <button
                type="button"
                onClick={resetForm}
                style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem', borderRadius: '999px', border: '1px solid #4b5563', background: 'transparent', color: '#e5e7eb' }}
              >
                + New
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '0.2rem' }}>Title</div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Meeting notes..."
                style={{ width: '100%', padding: '0.5rem 0.6rem', borderRadius: '0.6rem', border: '1px solid #374151', background: '#020617', color: '#e5e7eb' }}
              />
            </label>

            <label>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '0.2rem' }}>Content</div>
              <textarea
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts here..."
                style={{ width: '100%', padding: '0.5rem 0.6rem', borderRadius: '0.6rem', border: '1px solid #374151', background: '#020617', color: '#e5e7eb', resize: 'vertical' }}
              />
            </label>

            <label>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '0.2rem' }}>Tags</div>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="work, ideas, todo"
                style={{ width: '100%', padding: '0.5rem 0.6rem', borderRadius: '0.6rem', border: '1px solid #374151', background: '#020617', color: '#e5e7eb' }}
              />
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.15rem' }}>
                Separate tags with commas.
              </div>
            </label>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.3rem' }}>
              <button
                type="button"
                onClick={handleSave}
                style={{
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  background: '#38bdf8',
                  color: '#020617',
                  cursor: 'pointer',
                }}
              >
                {currentId ? 'Save changes' : 'Add note'}
              </button>
              <button
                type="button"
                onClick={handleSummarize}
                style={{
                  borderRadius: '999px',
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.85rem',
                  background: '#020617',
                  border: '1px solid #4b5563',
                  color: '#e5e7eb',
                  cursor: 'pointer',
                }}
              >
                AI Summarize (fake)
              </button>
            </div>

            {summary && (
              <div style={{ marginTop: '0.6rem', padding: '0.5rem 0.6rem', borderRadius: '0.6rem', border: '1px dashed #4b5563', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.12em', color: '#9ca3af' }}>
                    Generated summary
                  </span>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#38bdf8' }}>
                    mock
                  </span>
                </div>
                <p style={{ margin: 0 }}>{summary}</p>
              </div>
            )}
          </div>
        </section>

        {/* Right: notes list */}
        <section style={{ padding: '1rem', borderRadius: '0.75rem', background: '#020617', border: '1px solid #1f2937' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              style={{ width: '100%', padding: '0.45rem 0.7rem', borderRadius: '999px', border: '1px solid #374151', background: '#020617', color: '#e5e7eb', fontSize: '0.85rem' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setActiveTag('all')}
                style={{
                  padding: '0.25rem 0.7rem',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: activeTag === 'all' ? '#38bdf8' : '#4b5563',
                  background: activeTag === 'all' ? '#0f172a' : 'transparent',
                  color: activeTag === 'all' ? '#e5e7eb' : '#9ca3af',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  style={{
                    padding: '0.25rem 0.7rem',
                    borderRadius: '999px',
                    border: '1px solid',
                    borderColor: activeTag === tag ? '#38bdf8' : '#4b5563',
                    background: activeTag === tag ? '#0f172a' : 'transparent',
                    color: activeTag === tag ? '#e5e7eb' : '#9ca3af',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {filteredNotes.length === 0 ? (
            <div style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '0.5rem' }}>
              No notes yet. Start by writing something on the left 👈
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gap: '0.6rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              }}
            >
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  style={{
                    padding: '0.7rem 0.75rem',
                    borderRadius: '0.7rem',
                    border: '1px solid',
                    borderColor: note.pinned ? '#eab308' : '#374151',
                    background: '#020617',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    minHeight: '110px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.4rem' }}>
                    <h3 style={{ margin: 0, fontSize: '0.9rem' }}>{note.title}</h3>
                    <button
                      type="button"
                      onClick={() => togglePin(note.id)}
                      title={note.pinned ? 'Unpin' : 'Pin'}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                      }}
                    >
                      {note.pinned ? '📌' : '📍'}
                    </button>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                    {note.content.length > 220
                      ? note.content.slice(0, 220) + '...'
                      : note.content}
                  </p>

                  {note.tags && note.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {note.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '999px',
                            border: '1px solid #4b5563',
                            color: '#9ca3af',
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      Updated{' '}
                      {new Date(note.updatedAt).toLocaleString(undefined, {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        type="button"
                        onClick={() => handleEdit(note)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '999px',
                          border: '1px solid #4b5563',
                          background: 'transparent',
                          color: '#e5e7eb',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '999px',
                          border: '1px solid #f97373',
                          background: 'transparent',
                          color: '#fecaca',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
      </div>
  </div>
);
}

export default App;
