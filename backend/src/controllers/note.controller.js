import { StatusCodes } from "http-status-codes"
import { customErrorResponse, customSuccessResponse } from "../utils/customResponse.js"
import { createNoteService, deleteNoteService, getUserNotesService, updateNoteService } from "../services/note.service.js";

function handleError (err, res) {
    if (err.statusCode) {
        res.status(err.statusCode).json(customErrorResponse(err))
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(customErrorResponse(err))
      }
}

export const getUserNotesController = async (req, res) => {
    try {
        const userId = req.user._id
        const response = await getUserNotesService(userId);
        res
          .status(StatusCodes.OK)
          .json(
            customSuccessResponse('All Workspace fetched successfully', response)
          )
      } catch (err) {
        handleError(err, res)
      }
}

export const createNoteController = async (req, res) => {
    try {
        const userId = req.user._id
        const data = req.body;
        const response = await createNoteService(userId, data);
        res
          .status(StatusCodes.OK)
          .json(
            customSuccessResponse('Note created successfully', response)
          )
    }
    catch (err) {
        handleError(err, res)
    }
}

export const deleteNoteController = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;
        const response = await deleteNoteService(userId, noteId);
        res
          .status(StatusCodes.OK)
          .json(
            customSuccessResponse('Note deleted successfully', response)
          )
    }
    catch (err) {
        handleError(err, res);
    }
}

export const updateNoteController = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;
    const data = req.body;
    const response = await updateNoteService(userId, noteId, data);
    res
      .status(StatusCodes.OK)
      .json(
        customSuccessResponse('Note updated successfully', response)
      )
  }
  catch (err) {
    handleError(err, res);
  }
}