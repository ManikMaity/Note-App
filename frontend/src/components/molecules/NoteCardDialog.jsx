import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Star, Maximize, Minimize, ImagePlus, Save, X, Underline } from "lucide-react";
import { Label } from "../ui/label";
// import { useUpdateNote } from "@/hooks/note/useUpdateNote";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utilFunc";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import useUploadNoteImage from "@/hooks/note/useUploadNoteImage";

function NoteCardDialog({ noteData, open, onOpenChange }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(noteData.title);

    const editor = useEditor({
      extensions: [StarterKit, Underline],
      content: '',
    });

    useEffect(() => {
      if (editor) {
        editor.commands.setContent(noteData.content);
      }
    }, [editor, noteData.content]);
    
  


//   const { mutateAsync: updateNote, isPending: isUpdating } = useUpdateNote();
//   const { mutateAsync: uploadImage, isPending: isUploading } = useUploadNoteImage();

//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
    
//     const url = await uploadImage({
//       noteId: noteData._id,
//       file
//     });
    
//     if (url) {
//       setEditedContent(`${editedContent}\n![image](${url})`);
//     }
//   };

//   const handleSave = async () => {
//     await updateNote({
//       id: noteData._id,
//       title: editedTitle,
//       content: editedContent
//     });
//     setIsEditing(false);
//   };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "max-w-3xl",
        isFullscreen && "w-full h-full max-w-none flex flex-col"
      )}>
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-xl font-bold"
              />
            ) : (
            <div className="space-y-1">
                <h2 className="text-xl font-bold">{noteData.title}</h2>
                <p className="text-muted-foreground text-sm">{formatDate(noteData.updatedAt)}</p>
            </div>
            )}
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
               
              >
                <Star
                  size={18}
                  className={noteData.favorite ? "text-yellow-500 fill-yellow-500" : ""}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {noteData.type === "transcript" && (
            <div className="mb-4 p-4 bg-muted rounded-lg w-full">
              <audio controls src={noteData.audioUrl} style={{width: "100%"}}/>
              <h3 className="font-medium mb-2">Audio Transcription:</h3>
              <p className="text-sm">{noteData.transcribedText}</p>
            </div>
          )}

          {isEditing ? (
            <div className="space-y-4">
               <EditorContent 
                            editor={editor} 
                            className="prose max-w-none focus:outline-none min-h-[200px]"
                    />
              
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <ImagePlus size={16} />
                  Add Image
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    // onChange={handleImageUpload} 
                  />
                </Label>
                {/* {isUploading && <span className="text-sm text-muted-foreground">Uploading...</span>} */}
              </div>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none space-y-2">
              <p className="p-2 max:min-h-60 overflow-y-scroll" dangerouslySetInnerHTML={{ __html: noteData.content}} ></p>
              {noteData.imageUrls?.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-4">
                  {noteData.imageUrls.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="Note attachment"
                      className="rounded-lg object-cover h-16 w-16"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X size={16} className="mr-2" /> Cancel
              </Button>
              <Button >
                <Save size={16} className="mr-2" /> 
                {/* {isUpdating ? "Saving..." : "Save Changes"} */}
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Note
              </Button>
              <Button onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NoteCardDialog;