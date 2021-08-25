const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

const PORT = process.env.PORT || 3001;
const app = express();


//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("./develop/public"));


//creating API routes, saving notes, and joins w/ db.json
app.get("/api/notes", function(req,res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});


//post func to enter new notes
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(".develop/db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
});


//deleting notes
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs/fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db,json", JSON.stringify(delNote));
    res.json(delNote);
});



//calling HTML Starting Page
app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// calling HTML Notes Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

//start listen
app.listen(PORT, function () {
    console.log("app is listening on PORT: " + PORT);
});

