import express from "express";
import "./db";
import Note, { NoteDocument } from "./models/note";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** instead of using express middleware, we can create our own.
app.use(
  // middleware - we can define multiple middleware fns.
  (req, res, next) => {
    req.on("data", (chunk) => {
      // console.log(JSON.parse(chunk));
      req.body = JSON.parse(chunk);
      next(); // moves to endpoint. If we dont call next(), then api req will hang.
    });
  }
);
**/

app.post("/", (req, res) => {
  console.log(req.body);
  res.send({ hello: "world" });
});

app.post("/create", async (req, res) => {
  // const newNote = new Note<NoteDocument>({
  //   title: (req.body as NoteDocument).title,
  //   description: (req.body as NoteDocument).description,
  // });
  // await newNote.save();
  // res.send({ saved: true });

  await Note.create<NoteDocument>({
    title: (req.body as NoteDocument).title,
    description: (req.body as NoteDocument).description,
  });
  res.send({ saved: true });
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body as NoteDocument;

  // const note = await Note.findById(id);
  // if (!note) return res.json({ error: "Note not found" });
  // note.title = (req.body as NoteDocument).title;
  // note.description = (req.body as NoteDocument).description;

  const note = Note.findByIdAndUpdate(
    id,
    { title, description },
    { new: true } // returns updated data as response.
  );
  if (!note) return res.json({ error: "Note not found" });

  res.send({ updated: true });
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const note = Note.findByIdAndDelete(id);
  if (!note) return res.json({ error: "Note not found" });

  res.send({ deleted: true });
});

app.listen(8000, () => {
  console.log("server running...");
});
