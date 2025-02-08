import { deleteNoteRequest } from '@/api/note'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from '../use-toast'

function useDeleteNote() {

    const queryClient = useQueryClient();
  
    const {mutateAsync : deleteNoteMutateAsync, isPending : deleteNoteLoading} = useMutation({
        mutationFn : deleteNoteRequest,
        onSuccess : () => {
            toast({
                description : "Successfully deleted note"
            })
            queryClient.invalidateQueries(["user-notes"]);
        },
        onError : () => {
            toast({
                description : "Failed to delete note"
            })
        }
    })


    return {
        deleteNoteMutateAsync,
        deleteNoteLoading
    }
}

export default useDeleteNote
