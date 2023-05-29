import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-26da6-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const loveNoteDB = ref(database, "loveNotes")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const noteList = document.getElementById("note-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    if(inputValue){
        push(loveNoteDB, inputValue)
    
        clearInputField()
    }
    
   
})

onValue(loveNoteDB, function(snapshot) {
    if (snapshot.exists() ) {
        let notesArray = Object.entries(snapshot.val())
        
        clearNotes()
        
        for (let i = notesArray.length - 1; i >= 0; i--){
            
            let currentNote = notesArray[i]
            let currentNoteID = currentNote[0]
            let currentNoteValue = currentNote[1]
            
            appendNoteToNoteList(currentNote)
        }    
    } else {
        noteList.innerHTML = "No notes here... yet"
    }
})

function clearInputField() {
    inputFieldEl.value = ""
}

function clearNotes() {
    noteList.innerHTML = ""
}

function appendNoteToNoteList(note) {
    let noteID = note[0]
    let noteValue = note[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = noteValue
    
    noteList.append(newEl)
}