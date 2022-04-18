const fs = require('fs');
const path = require('path');
const express = require('express');

const { notes } = require('./db/db.json');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


// FUNCTIONS


// Function to filter results by Id
function filterById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

// function to create note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray }, null, 2)
    );
    return note;
}
// function to validate the notes entry
// need to check Id
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    if (!note.id || typeof note.id !== 'string') {
        return false;
      }
    return true;
};


// ROUTES
// Index HTML Route
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});
// Notes HTML Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join (__dirname, './public/notes.html'))
});

// Route to get notes
app.get('/api/notes', (req, res) =>{
    
   res.json(notes);
});

// Route to display single note
app.get('/api/notes/:id', (req,res) =>{
    const result = filterById(req.params.id, notes);
    if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
});

// Route to create a note
app.post('/api/notes', (req, res) =>{
    req.body.id = notes.length.toString();

    if(!validateNote(req.body)) {
        res.status(400).send('the note is not properly formated.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// Route to delete notes fetching api/notes/IUid

// route to edit notes



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
  