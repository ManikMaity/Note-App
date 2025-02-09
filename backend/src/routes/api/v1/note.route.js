import { Router } from "express";
import authenticate from "../../../middlewares/authMiddleware.js";
import { createNoteController, deleteNoteController, getUserNotesController, updateNoteController } from "../../../controllers/note.controller.js";
import { createNoteSchema, updateNoteSchema } from "../../../validations/note.validation.js";
import validate from "../../../validations/validator.js";

const noteRouter = Router();

noteRouter.get("/", authenticate, getUserNotesController);
noteRouter.post("/create", validate(createNoteSchema),  authenticate,  createNoteController);
noteRouter.delete("/delete/:id", authenticate, deleteNoteController);
noteRouter.put("/update/:id", validate(updateNoteSchema), authenticate, updateNoteController);

export default noteRouter;