var notes = [];
var isLocalStorage = false;

if (typeof Storage !== 'undefined') {
  isLocalStorage = true;
} else {
  alert('No browser storage support');
}

function getNoteFromStorage(){
	if (isLocalStorage) {
     	return JSON.parse(localStorage.getItem("notes")) || [];  
    }
}

function loadNoteFromStorage(){
	notes = getNoteFromStorage();
	console.log("all notes => "+notes.length);
	if (notes){
		notes.forEach(function(note){
		
			AddNote(note);
		});
	}
}

function saveNoteToStorage(notes){
	localStorage.setItem("notes", JSON.stringify(notes));
}

function updateNoteInStorage(note){
	
}

function deleteNoteFromStorage(notes){			
	saveNoteToStorage(notes);
}

const addButton = document.querySelector('.addbutton');
const allNotes = document.querySelector('.notes');

window.addEventListener('load', loadNoteFromStorage);
			
addButton.addEventListener('click', function(){AddNote('')});	

function AddNote(newText){
	var newNote = document.createElement('div');
	newNote.className = 'notecontainer';
	
	newNote.innerHTML = `
		<div class="noteheader">
			<div class="icon">
				<i class="edit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
				  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
				  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
				</svg></i>

				<i class="delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
				  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
				  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
				</svg></i>
			</div>
		</div>

		<div class='notebody'>
			<div class="notediv hidden"></div>
			<textarea class="notearea"></textarea>
		</div>
	`;

	const editButton = newNote.querySelector('.edit');
	const deleteButton = newNote.querySelector('.delete');
	const noteDiv = newNote.querySelector('.notediv');
	const noteArea = newNote.querySelector('.notearea');
	
	var id;
	
	if (newText){
		id = Object.keys(newText)[0];
		noteArea.value = Object.values(newText)[0];

		
		noteDiv.innerHTML = noteArea.value.replace(/\r?\n/g, '</br>');
	}
	else{
		id = new Date().valueOf();
	}
	
	newNote.id = id.toString();

	deleteButton.addEventListener('click', function(e){
		var noteContainer = e.target.closest('.notecontainer');
		var delNoteId = noteContainer.id;
		console.log("delNoteId => "+delNoteId);
		console.log("allNotes => "+allNotes.className);

		var index = -1;
		index = notes.findIndex(function(obj){
			return Object.keys(obj)[0] === delNoteId;
		});
		console.log("index => "+index);

		notes.splice(index, 1);
		deleteNoteFromStorage(notes);

	
		allNotes.removeChild(noteContainer);
	});

	editButton.addEventListener('click', function(){
		noteDiv.classList.toggle('hidden');
		noteArea.classList.toggle('hidden');
	});

	noteArea.addEventListener('change', function(e){
		var noteText = e.target.value;
		var noteId = e.target.parentNode.id;
	

		noteDiv.innerHTML = noteText.replace(/\r?\n/g, '</br>');
		console.log("noteId => "+noteId+", noteText => "+noteText);

		
		var savedNote = {};
		savedNote[noteId] = noteText;
		console.log("savedNote.id => "+Object.keys(savedNote)[0]);

		var curNote = [];
		if (newText){
			

			
			for (var i = 0; i < notes.length; i++){
				console.log("notes[i] => "+Object.keys(notes[i])[0]);
			
				if (Object.keys(notes[i])[0] === noteId){
					curNote.push(notes[i]);
					console.log(curNote);
					break;
				}
				
			}
			

			var index = -1;
			if (curNote.length > 0){
				console.log("curNote => "+Object.entries(curNote[0])[0]);

				index = notes.findIndex(function(obj){
			
					return Object.keys(obj)[0] == Object.keys(curNote[0])[0];
				});
				console.log("index => "+index);

			
				notes[index] = savedNote;
			}

		}
		else {
		
			notes.push(savedNote);
		}

		
		saveNoteToStorage(notes);
	});

	allNotes.appendChild(newNote);
}

