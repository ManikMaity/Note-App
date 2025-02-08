import { formatDate } from "@/lib/utilFunc";
import { Card, CardContent } from "../ui/card"
import { BookAIcon, Copy, EllipsisVertical, Image, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

function NoteCard({noteData}) {

    const contentRef = useRef(null);

    useEffect(() => {
      if (contentRef.current) {
        contentRef.current.innerHTML= noteData?.content;
      }
    }, [noteData, contentRef]);
    

  return (
  <Card className="px-3 py-2 h-full flex flex-col">
    <CardContent className="p-0 flex flex-col h-full min-h-[200px]">
      <div className="text-xs text-muted-foreground flex justify-between gap-2 items-center border-b pb-1 mb-2">
        <p>{formatDate(noteData?.updatedAt)}</p>
        <p className="text-black">{noteData?.type === "transcript" ? <Play /> : <BookAIcon />}</p>
      </div>

      <div className="space-y-1 flex-1">
        <h3 className="font-semibold line-clamp-1 text-base">{noteData?.title}</h3>
        <p ref={contentRef} className="text-sm">{noteData?.content}</p>
       {noteData?.imageUrls.length > 0 && <p className="text-xs text-gray-700 mt-1 flex gap-1 items-center py-0.5 px-1 rounded-lg bg-gray-200 w-fit">
          <Image size={12} /> {noteData?.imageUrls.length} Image
        </p>}
      </div>

      <div className="flex gap-2 justify-end items-baseline">
        <Button size="xs" variant="outline" className="p-1"><Copy size={12} /></Button>
        <Button size="xs" variant="outline" className="p-1"><EllipsisVertical size={12} /></Button>
      </div>
    </CardContent>
  </Card>
);
}

export default NoteCard
