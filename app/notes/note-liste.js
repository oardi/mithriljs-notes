let noteListe = {
    notes: noteService.getNotes(),
    inputTitle: null,

    oncreate: function () {
        this.inputTitle = document.querySelector("#input-title")
    },

    addNote: function () {
        console.log(`addNote`);
        if (this.inputTitle.value != "") {
            noteService.addNote(this.inputTitle.value);
            this.notes = noteService.getNotes();
            this.inputTitle.value = "";
        } else
            this.inputTitle.focus();
    },

    deleteNote: function (id) {
        console.log(`deleteNote ${id}`);
        noteService.deleteNote(id);
        this.notes = noteService.getNotes();
    },

    view: function () {
        return [
            m("nav.navbar",
                m("div.container",
                    m("div.input-group", [
                        m("input.input[type=text][placeholder=note title...]#input-title", { onkeydown: (e) => e.keyCode == 13 ? this.addNote() : null }),
                        m("button.btn.btn-icon", { onclick: () => this.addNote() }, m("i.icon.icon-add"))
                    ])
                )
            ),
            m("div.page",
                m("div", //.container
                    m("ul.list#note-liste",
                        this.notes.map(note =>
                            m("li.list-item", //.card
                                m("span[style=flex:1]", note.title),
                                m("button.btn.btn-icon", { onclick: () => this.deleteNote(note.id) },
                                    m("i.icon.icon-delete")
                                )
                            )
                        )
                    )
                )
            )
        ];
    }
};
