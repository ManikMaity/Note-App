import { createNoteRequest } from "@/api/note"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "../use-toast"
import { getErrorMessage } from "@/lib/utilFunc"

function useCreateNote() {

  const queryClient = useQueryClient();

  const {mutateAsync : createNoteMutateAsync, isPending : createNoteLoading} = useMutation({
    mutationFn: createNoteRequest,
    onSuccess: (data) => {
        toast({
            description: "Successfully created note",
        })
        queryClient.invalidateQueries(["user-notes"]);
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
