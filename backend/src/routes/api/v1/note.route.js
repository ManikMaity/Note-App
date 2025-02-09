import { Router } from "express";
import authenticate from "../../../middlewares/authMiddleware.js";
import { changeNoteFavoriteStatusController, createNoteController, deleteNoteController, getUserNotesController, updateNoteController } from "../../../controllers/note.controller.js";
import { createNoteSchema, updateNoteSchema } from "../../../validations/note.validation.js";
import validate from "../../../validations/validator.js";

const noteRouter = Router();

noteRouter.post("/", authenticate, getUserNotesController);
noteRouter.post("/create", validate(createNoteSchema),  authenticate,  createNoteController);
noteRouter.delete("/delete/:id", authenticate, deleteNoteController);
noteRouter.put("/update/:id", validate(updateNoteSchema), authenticate, updateNoteController);
noteRouter.put("/favorite/:id", authenticate, changeNoteFavoriteStatusController);

export default noteRouter;