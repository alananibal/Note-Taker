const express = require('express');
const { notes } = require('./develop/db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// Function to filter results by Id
function filterById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}



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

// Route to delete notes fetching api/notes/IUid



// route to edit notes



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
  