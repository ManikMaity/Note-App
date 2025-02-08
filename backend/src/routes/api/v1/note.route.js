import { Router } from "express";
import authenticate from "../../../middlewares/authMiddleware.js";
import { createNoteController, deleteNoteController, getUserNotesController } from "../../../controllers/note.controller.js";
import { createNoteSchema } from "../../../validations/note.validation.js";
import validate from "../../../validations/validator.js";

const noteRouter = Router();

noteRouter.get("/", authenticate, getUserNotesController);
noteRouter.post("/create", validate(createNoteSchema),  authenticate,  createNoteController);
noteRouter.delete("/delete/:id", authenticate, deleteNoteController);
// noteRouter.put("/update/:id", authenticate, updateNoteController);

export default noteRouter;