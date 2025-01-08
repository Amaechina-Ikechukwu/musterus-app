// Base type for common fields
export type CommonUserInfo = {
  uid: string;
  firstname: string;
  lastname: string;
  registeremail: string;
  mskl: string;
  createdate: string;
  useraccountstatus: string;
  maritalstatus: string;
  children: string;
  borncity: string | null;
  borncountry: string | null;
  livingaddress: string;
  livingcity: string;
  livingstate: string;
  livingzipcode: string;
  livingcountry: string;
  nationality: string;
  gender: string;
  birthdate: string;
  relationship: string | null;
  inrelation: string;
  anniversary: string;
  accounttype: string | null;
  passwordhint: string;
  hintanswer: string;
  userheaderintro: string;
  profileintro: string;
  education: string;
  edulocation: string;
  graduateyear: string;
  jobtitle: string;
  wherework: string;
  privateaccount: string;
  whereborncountry: string | null;
  whereborncity: string | null;
  skype: string;
  whatsapp: string | null;
  telegram: string;
  viber: string;
  signalnumber: string;
  lastloginip: string | null;
  usertimezone: string | null;
  reportedaccount: string;
  currentlocation: string | null;
  inrelationwith: string | null;
  facebook: string;
  instagram: string;
  linkedin: string;
  pinterest: string;
  youtube: string;
  xing: string | null;
  twitter: string;
  profilekey: string;
  scheduler: string;
  avatar: string;
  profilebg: string;
  publicurl: string;
  resetlink: string | null;
  speakinglanguages: string | null;
};

// UserProfile type
export type UserProfile = CommonUserInfo & {
  ffid: string;
  fuid: string;
  friendid: string;
  followid: string;
  friendstat: string;
  followstat: string;
};

// Post type
export type Post = CommonUserInfo & {
  comid: string;
  userkey: string;
  comment: string;
  writetime: string;
  status: string;
  attachedimage: string | null;
  userpassword: string;
};

// Comment type
export type Comment = CommonUserInfo & {
  comreplyid: string;
  comid: string;
  userkey: string;
  comment: string;
  writetime: string;
  status: string;
  attachedimage: string | null;
  userpassword: string;
};
// Group type
export type Group = {
  grid: string;
  groupname: string;
  owner: string;
  groupkey: string;
  groupurl: string;
  groupintro: string;
  grouppolicy: string;
  moderated: string;
  grouplogo: string | null;
  groupbg: string | null;
  groupheader: string | null;
  groupstatus: string;
  publicgroup: string;
  createdate: string;
  groupcategory: string;
  website: string;
  gcatrow: string;
  catname: string;
  caturl: string;
  catstatus: string;
  catimage: string | null;
};

// GroupMember type
export type GroupMember = CommonUserInfo & {
  grmid: string;
  groupid: string;
  memberid: string;
  approved: string;
  groupmemberstatus: string;
  moderator: string;
};
export interface GroupPost {
  grouppostid: string;
  groupid: string;
  memberid: string;
  posttitle: string;
  postbody: string;
  attachedimage: string | null;
  approved: string;
  posttime: string;
  postdate: string;
  poststatus: string;
  uid: string;
  username: string;
  firstname: string;
  lastname: string;
  registeremail: string;
  [key: string]: any; // For additional properties
}

export interface APIResponse {
  Posts: GroupPost[];
  Group: Group;
  MyGroupAccess: Group;
}
export interface ProfileInfo {
  MyPosts: Post[];
  MyFollowers: UserProfile[];
  MyFriends: UserProfile[];
}
// Define the store state type
export type StoreState = {
  profile: UserProfile | null;
  posts: Post[] | null;
  singlePost: Post | null;
  postInView: string[];
  allGroups: Group[] | null;
  myGroups: Group[] | null;
  otherGroups: Group[] | null;
  singleGroup: Group | null;
  profileInfo: ProfileInfo | null;
  groupMembers: GroupMember[] | null;
  updatePosts: (post: Post[]) => void;
  updateProfile: (profile: UserProfile) => void;
  updateSinglePost: (post: Post | null) => void;
  updatePostInView: (post: string) => void;
  updateAllGroups: (groups: Group[]) => void;
  updateMyGroups: (groups: Group[]) => void;
  updateOtherGroups: (groups: Group[]) => void;
  updateSingleGroup: (group: Group) => void;
  updateProfileInfo: (profileInfo: ProfileInfo) => void;
  updateGroupMembers: (members: GroupMember[]) => void;
};
