// Import create with type
import { create } from "zustand";
import {
  Group,
  GroupMember,
  OnlineUsers,
  Post,
  ProfileInfo,
  StoreState,
  UserProfile,
} from "./constants/types";

// Create the store with proper typing
export const MStore = create<StoreState>((set) => ({
  profile: null,
  posts: null,
  postInView: [],
  singlePost: null,
  allGroups: null,
  myGroups: null,
  otherGroups: null,
  singleGroup: null,
  profileInfo: null,
  groupMembers: null,
  friend: null,
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
  updateAllGroups: (groups: Group[]) => set({ allGroups: groups }),
  updateMyGroups: (groups: Group[]) => set({ myGroups: groups }),
  updateOtherGroups: (groups: Group[]) => set({ otherGroups: groups }),
  updateSingleGroup: (group: Group) => set({ singleGroup: group }),
  updateProfileInfo: (profileInfo: ProfileInfo) =>
    set({ profileInfo: profileInfo }),
  updateGroupMembers: (members: GroupMember[]) =>
    set({ groupMembers: members }),
  updateFriend: (friendData: OnlineUsers) => set({ friend: friendData }),
}));
