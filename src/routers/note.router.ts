import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/note.controller";

const router = Router();

router.post("/create", createNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/", getAllNotes);
router.get("/:id", getNote);

export default router;
