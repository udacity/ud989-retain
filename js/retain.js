const $ = (elem) => document.querySelector(elem);

const model = {
	init: function () {
		if (!localStorage.notes) {
			localStorage.notes = JSON.stringify([]);
		}
	},
	add: function (obj) {
		const data = JSON.parse(localStorage.notes);
		data.push(obj);
		console.log(obj);
		localStorage.notes = JSON.stringify(data);
	},
	getAllNotes: function () {
		return JSON.parse(localStorage.notes);
	},
};

const octopus = {
	addNewNote: function (noteStr) {
		model.add({
			content: noteStr,
		});
		view.render();
	},

	getNotes: function () {
		return model.getAllNotes();
	},

	init: function () {
		model.init();
		view.init();
	},
};
//submit event는 input에 하면 x,
//form에다 달아야됨
const view = {
	init: function () {
		this.noteList = $('#notes');
		const newNoteForm = $('#new-note-form');
		const newNoteContent = $('#new-note-content');
		newNoteForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const entered = newNoteContent.value;
			model.add({ content: entered });
			newNoteContent.value = '';
			view.render();
		});
	},
	render: function () {
		let newNote = '';
		octopus.getNotes().map((note) => {
			newNote += `<li class="note">${note.content}</li>`;
		});
		this.noteList.innerHTML = newNote;
	},
};

octopus.init();
