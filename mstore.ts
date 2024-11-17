// Import create with type
import { create } from "zustand";
import { Post, StoreState, UserProfile } from "./constants/types";

// Create the store with proper typing
export const MStore = create<StoreState>((set) => ({
  profile: null,
  posts: null,
  postInView: [],
  singlePost: null,
  updateProfile: (newProfile: UserProfile) => set({ profile: newProfile }),
  updateSinglePost: (newPost: Post | null) => set({ singlePost: newPost }),

  updatePosts: (newPosts: Post[]) => set({ posts: newPosts }),
  updatePostInView: (post) =>
    set((state) => {
      const updatedPostInView = [...state.postInView, post];
      // Ensure the array has only the 4 most recent posts
      if (updatedPostInView.length > 3) {
        updatedPostInView.shift();
      }
      return { postInView: updatedPostInView };
    }),
}));
