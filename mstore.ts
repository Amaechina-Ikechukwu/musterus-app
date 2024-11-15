// Import create with type
import { create } from "zustand";
import { Post, StoreState, UserProfile } from "./constants/types";

// Create the store with proper typing
export const MStore = create<StoreState>((set) => ({
  profile: null,
  posts: null,
  updateProfile: (newProfile: UserProfile) => set({ profile: newProfile }),

  updatePosts: (newPosts: Post[]) => set({ posts: newPosts }),
}));
