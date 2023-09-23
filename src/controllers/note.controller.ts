import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/Note";

// create note
export const createNote: RequestHandler = async (req, res) => {
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
};

// update note
export const updateNote: RequestHandler = async (req, res) => {
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
};

// delete note
export const deleteNote: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const note = Note.findByIdAndDelete(id);
  if (!note) return res.json({ error: "Note not found" });

  res.send({ deleted: true });
};

// get all notes
export const getAllNotes: RequestHandler = async (req, res) => {
  const notes = await Note.find();
  res.json({ notes });
};

// get note by id
export const getNote: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.json({ error: "Note not found" });
  res.json({ note });
};
