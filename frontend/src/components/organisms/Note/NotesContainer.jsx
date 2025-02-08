import SpinnerLoader from "@/components/atoms/SpinnerLoader";
import NoteCard from "@/components/molecules/NoteCard";
import useGetUserNotes from "@/hooks/note/useGetUserNotes";
import { getErrorMessage } from "@/lib/utilFunc";
import React from "react";

function NotesContainer() {
  const { notes, isLoading, isSuccess, isError, error } = useGetUserNotes();
  console.log(notes);

  return (
    <div className="p-2">
      {isError && <p>{getErrorMessage(error)}</p>}
      {isLoading && <SpinnerLoader />}
      {isSuccess && <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {notes.map((note) => (
          <NoteCard noteData={note} key={note._id} />
        ))}
      </div>}
    </div>
  );
}

export default NotesContainer;
