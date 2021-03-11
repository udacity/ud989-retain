(function(){
    
    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = document.getElementById("notes");
            var newNoteForm = document.getElementById("new-note-form");
            var newNoteContent = document.getElementById("new-note-content");
            newNoteForm.addEventListener("submit", (e) => {
                octopus.addNewNote(newNoteContent.value);
                newNoteContent.value = "";
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            while (this.noteList.childNodes.length) {
                this.noteList.removeChild(this.noteList.childNodes[0]);
            }
            octopus.getNotes().forEach((note, i) =>{
                var noteItem = document.createElement("li");
                noteItem.className = "note";
                noteItem.innerText = note.content;
                this.noteList.appendChild(noteItem);
            });
        }
    };

    octopus.init();
})();