import {
  INITIALIZED,
  CATEGORIES,
  CART,
  ITEMS,
  SURPRISES,
  USER,
  LOGOUT,
  FETCH_USER_TIME,
  BRETHREN,
  JOBS,
  EVENTS,
  FELLOWSHIPTOPAY,
  STATE,
  CONNECT_USER,
} from '../state/types';

export const Items = payload => {
  return {
    type: ITEMS,
    payload,
  };
};

export const Connect_user = payload => {
  return {
    type: CONNECT_USER,
    payload,
  };
};
export const Fell_to_pay = payload => {
  return {
    type: FELLOWSHIPTOPAY,
    payload,
  };
};

export const All_Events = payload => {
  return {
    type: EVENTS,
    payload,
  };
};

export const SelectedState = payload => {
  return {
    type: STATE,
    payload,
  };
};

export const FetchUserTime = payload => {
  return {
    type: FETCH_USER_TIME,
    payload,
  };
};

export const Brethren = payload => {
  return {
    type: BRETHREN,
    payload,
  };
};

export const FetchJobs = payload => {
  return {
    type: JOBS,
    payload,
  };
};

export const user_state = payload => {
  return {
    type: USER,
    payload,
  };
};

export const logoutUser = payload => {
  return {
    type: LOGOUT,
  };
};

export const surprise_state = payload => {
  return {
    type: SURPRISES,
    payload,
  };
};

export const categories = payload => {
  return {
    type: CATEGORIES,
    payload,
  };
};

export const initAuth = () => {
  return {
    type: INITIALIZED,
  };
};

export const CartItems = payload => {
  return {
    type: CART,
    payload,
  };
};
export const setUser = userData => ({
  type: USER,
  payload: userData,
});
export const setMyFriends = userData => ({
  type: 'FRIENDS',
  payload: userData,
});
export const setMyProfile = userData => ({
  type: 'PROFILE',
  payload: userData,
});
export const setGroups = groups => ({
  type: 'GROUPS',
  payload: groups,
});
export const setChatlist = chatlist => ({
  type: 'CHATLIST',
  payload: chatlist,
});
export const setGroup = group => ({
  type: 'GROUP',
  payload: group,
});
export const setGroupsMessages = group => ({
  type: 'GROUP MESSAGES',
  payload: group,
});
export const setPosts = posts => ({
  type: 'POSTS',
  payload: posts,
});
export const setPost = post => ({
  type: 'POST',
  payload: post,
});
export const setVisitID = id => ({
  type: 'VISITID',
  payload: id,
});
