export type UserProfile = {
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
export type Post = {
  comid: string;
  uid: string;
  userkey: string;
  comment: string;
  writetime: string;
  status: string;
  attachedimage: string | null;
  username: string;
  firstname: string;
  lastname: string;
  registeremail: string;
  userpassword: string;
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
  ffid: string;
  fuid: string;
  friendid: string;
  followid: string;
  friendstat: string;
  followstat: string;
};

// Define the store state type
export type StoreState = {
  profile: UserProfile | null;
  posts: Post[] | null;
  updatePosts: (post: Post[]) => void;
  updateProfile: (profile: UserProfile) => void;
};