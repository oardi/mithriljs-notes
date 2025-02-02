let noteService = {
    notesLocalStorageKey: "notes",

    getNotes: function () {
        console.log(`NoteService.getNotes`);
        let notes = JSON.parse(localStorage.getItem(this.notesLocalStorageKey));
        if (!notes) notes = [];
        if (notes) notes.sort((a, b) => { return a.title > b.title ? 1 : -1 });
        return notes;
    },

    addNote: function (noteTitle) {
        console.log(`NoteService.addNote (${noteTitle})`);
        let notes = this.getNotes();
        let ids = notes.map(note => parseInt(note.id));
        let nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        notes.push({ id: nextId, title: noteTitle });
        this.saveNotes(notes);
    },

    saveNotes: function (notes) {
        console.log(`NoteService.saveNotes`);
        localStorage.setItem(this.notesLocalStorageKey, JSON.stringify(notes));
    },

    deleteNote: function (id) {
        console.log(`NoteService.deleteNote (${id})`);
        let notes = this.getNotes();
        let noteToDelete = notes.find(note => note.id == id);
        if (noteToDelete) {
            notes.splice(notes.indexOf(noteToDelete), 1);
            this.saveNotes(notes);
        }
    }

}
