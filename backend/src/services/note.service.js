import { StatusCodes } from "http-status-codes";
import noteRepo from "../repositories/note.repo.js"

export const getUserNotesService = async (userId) => {
    const notes = await noteRepo.getUserNotesByUserId(userId);
    return notes;
}

export const createNoteService = async (userId, data) => {
    const note = await noteRepo.create({...data, user : userId});
    return note
}

export const deleteNoteService = async (userId, noteId) => {

    const note = await noteRepo.getById(noteId);
    if (!note) {
        throw {
            statusCode : StatusCodes.NOT_FOUND,
            message : "Note not found",
            explanation : ["Note not found"]
        }
    }
    if (note.user.toString() !== userId.toString()) {
        throw {
            statusCode : StatusCodes.UNAUTHORIZED,
            message : "You are not authorized to delete this note",
            explanation : ["You are not authorized to delete this note"]
        }
    }

    const deletedNote = await noteRepo.delete(noteId);
    return deletedNote
}

