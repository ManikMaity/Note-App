import { getNotesRequest } from "@/api/note"
import { useQuery } from "@tanstack/react-query"
import useFilterStore from "../store/filterStore";

function useGetUserNotes() {

  const {filters} = useFilterStore();

  const {data : notes, isLoading, isError, isSuccess, error, refetch} = useQuery({
    queryFn : async () => await getNotesRequest(filters),
    queryKey: ["user-notes", filters],
    staleTime: 10 * 1000 * 60 // 10 minutes
  });

  return {notes, isLoading, isError, isSuccess, error, refetch};
}

export default useGetUserNotes
