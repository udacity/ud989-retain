$(function(){

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
            return JSON.parse(localStorage.notes);             // 3b: provide data for octopus 
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({                                        // 2a: update model upon receiving data from view
                content: noteStr
            });
            view.render();                                     // 3a: reflect model changes in view
        },

        getNotes: function() {                                 
            return model.getAllNotes();                        // 2b: request data from model upon view request
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());       // 1a: apply entered data to octopus
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){          // 1b: request data from octopus
                htmlStr += '<li class="note">'+
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});
