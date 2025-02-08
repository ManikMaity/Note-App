import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalStore from "@/hooks/store/modalStore";

function CreateNoteModal() {

    const {createNoteModalOpen, closeCreateNote} = useModalStore();


  return (
    <Dialog open={createNoteModalOpen} onOpenChange={() => closeCreateNote()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNoteModal;
