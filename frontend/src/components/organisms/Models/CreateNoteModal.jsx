import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import useModalStore from "@/hooks/store/modalStore";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  List, 
  ListOrdered,
  Save
} from "lucide-react";
import useCreateNote from '@/hooks/note/useCreateNote';
import { htmlToMobileText } from '@/lib/utilFunc';

function CreateNoteModal() {
  const { createNoteModalOpen, closeCreateNote } = useModalStore();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {createNoteMutateAsync, createNoteLoading} = useCreateNote();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
  });

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!editor?.getHTML()) {
      setError('Content is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await createNoteMutateAsync({
        title,
        content: editor.getHTML(),
        unformatedContent : htmlToMobileText(editor.getHTML()),
      });
      setTitle('');
      editor?.commands.clearContent();
      setError('');
      closeCreateNote();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!editor) return null;

  return (
    <Dialog open={createNoteModalOpen} onOpenChange={closeCreateNote}>
      <DialogContent className="max-w-2xl min-h-[500px] flex flex-col">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">New Note</h2>
            <Button 

              onClick={handleSubmit}
              disabled={isSubmitting || createNoteLoading}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Note
            </Button>
          </div>

          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            className="p-2 text-lg font-medium  rounded-md outline-none "
          />

          <div className="flex-1 border rounded-md p-4 overflow-y-auto">
            <EditorContent 
              editor={editor} 
              className="prose max-w-none focus:outline-none min-h-[200px]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-2 p-2 justify-center rounded-md">
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'bg-gray-100' : ''}
            >
              <Bold className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'bg-gray-100' : ''}
            >
              <Italic className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'bg-gray-100' : ''}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>

            <div className="mx-2 h-full w-px bg-gray-200" />

            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'bg-gray-100' : ''}
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'bg-gray-100' : ''}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNoteModal;