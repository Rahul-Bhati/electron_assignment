const notesList = document.getElementById('notes');
const noteContent = document.getElementById('note-content');
const saveButton = document.getElementById('save-btn');

let notes = [];
let selectedNoteIndex = null;

// Load notes on startup
window.electronAPI.loadNotes().then((loadedNotes) => {
    notes = loadedNotes;
    renderNotesList();
});

function renderNotesList() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = note.substring(0, 20);
        listItem.addEventListener('click', () => {
            selectedNoteIndex = index;
            noteContent.value = note;
        });
        notesList.appendChild(listItem);
    });
}

saveButton.addEventListener('click', () => {
    const content = noteContent.value.trim();
    if (content) {
        if (selectedNoteIndex !== null) {
            notes[selectedNoteIndex] = content;
        } else {
            notes.push(content);
        }
        window.electronAPI.saveNote(notes).then(() => {
            renderNotesList();
            noteContent.value = '';
            selectedNoteIndex = null;
        });
    }
});
