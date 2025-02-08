import { create } from 'zustand';

const useModalStore = create((set) => ({
  createNoteModalOpen: true,

  openCreateNote: () => set({ createNoteModalOpen: true }),
  closeCreateNote: () => set({ createNoteModalOpen: false }),

}));


export default useModalStore;