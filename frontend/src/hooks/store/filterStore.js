import { create } from 'zustand';

const useFilterStore = create((set) => ({
    filters : {
       keyword : "",
       type : "",
       isFavorite : "",
       sort : "newest",
    },

    setFilter : (key, value) =>
        set((state) => ({
            filters: { ...state.filters, [key]: value }
        })),
    
        resetFilters: () =>
            set({
                filters: { isPrivate: false, title: '', favorite: false }
        })
}));

export default useFilterStore;