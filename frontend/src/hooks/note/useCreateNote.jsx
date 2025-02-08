import { createNoteRequest } from "@/api/note"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../use-toast"
import { getErrorMessage } from "@/lib/utilFunc"

function useCreateNote() {
  const {mutateAsync : createNoteMutateAsync, isPending : createNoteLoading} = useMutation({
    mutationFn: createNoteRequest,
    onSuccess: (data) => {
        toast({
            description: "Successfully created note",
        })
    },
    onError: (error) => {
        toast({
            title: "Error creating note",
            description: getErrorMessage(error),
            variant: "destructive",
        })
    }
  })


  return {
    createNoteMutateAsync,
    createNoteLoading
  }
}

export default useCreateNote
