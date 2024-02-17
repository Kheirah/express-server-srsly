const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const notes = {};
let nextId = 1;

// Get all notes
app.get("/", (req, res) => {
  res.send(Object.values(notes));
});

// Create a new note
app.post("/", (req, res) => {
  const id = nextId++;
  const { content } = req.body;
  notes[id] = { id, content };
  res.status(201).send(notes[id]);
});

// Get a single note by id
app.get("/:id", (req, res) => {
  const note = notes[req.params.id];
  if (note) {
    res.send(note);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

// Update a note
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { content } = req.body;

  if (notes[id]) {
    notes[id].content = content;
    res.send(notes[id]);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

// Delete a note
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (notes[id]) {
    delete notes[id];
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
