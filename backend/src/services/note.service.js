import { StatusCodes } from "http-status-codes";
import noteRepo from "../repositories/note.repo.js"
import { buildQuery } from "../utils/buildQuery.js";

export const getUserNotesService = async (userId, body) => {
    const query = buildQuery(body);
    let sortOption = { createdAt: -1 }; 

    if (body.sort === "oldest") {
        sortOption = { createdAt: 1 };
    }

    const notes = await noteRepo.getUserNotesByUserId({...query, user : userId}, sortOption);
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

export const updateNoteService = async (userId, noteId, data) => {
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
            message : "You are not authorized to update this note",
            explanation : ["You are not authorized to upadate this note"]
        }
    }

    const updatedNote = await noteRepo.update(noteId, data);
    return updatedNote;
}