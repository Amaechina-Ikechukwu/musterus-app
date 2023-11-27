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

const initialState = {
  initialized: false,
  CartItems: [],
  Items: [],
  Brethren: [],
  User: null,
  ViewUser: null,
  FetchUserTime: {
    jobFetch: '0',
    usersFetch: '0',
  },
  Jobs: [],
  Events: [],
  FellowshipToPay: null,
  User_State: null,
  Profile: null,
  Groups: null,
  Group: null,
  GroupMessages: {},
  Posts: null,
  Post: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    case LOGOUT:
      return {
        ...state,
        User: null,
        FellowshipToPay: null,
        User_State: null,
      };

    case CONNECT_USER:
      return {
        ...state,
        ViewUser: action.payload,
      };

    case STATE:
      return {
        ...state,
        User_State: action.payload,
      };

    case BRETHREN:
      return {
        ...state,
        Brethren: action.payload,
      };

    case FELLOWSHIPTOPAY:
      return {
        ...state,
        FellowshipToPay: action.payload,
      };

    case JOBS:
      return {
        ...state,
        Jobs: action.payload,
      };

    case EVENTS:
      return {
        ...state,
        Event: action.payload,
      };

    case USER:
      return {
        ...state,
        User: action.payload,
      };
    case 'PROFILE':
      return {
        ...state,
        Profile: action.payload,
      };
    case 'GROUPS':
      return {
        ...state,
        Groups: action.payload,
      };
    case 'GROUP':
      return {
        ...state,
        Group: action.payload,
      };
    case 'POSTS':
      return {
        ...state,
        Posts: action.payload,
      };
    case 'POST':
      return {
        ...state,
        Post: action.payload,
      };
    case 'GROUP MESSAGES':
      const {key, chats} = action.payload;

      // Check if the key exists in the GroupMessages object
      if (state.GroupMessages.hasOwnProperty(key)) {
        // Extract the existing messages for the key (if any)
        const existingMessages = state.GroupMessages[key] || [];

        // Filter out duplicates based on unique identifiers (for example, using message IDs)
        const uniqueMessages = chats.filter(newMessage => {
          // Check if the message ID already exists in the existing messages
          return !existingMessages.some(
            existingMessage => existingMessage.id === newMessage.id,
          );
        });

        // Combine unique messages with existing messages
        const updatedMessages = [...existingMessages, ...uniqueMessages];

        return {
          ...state,
          GroupMessages: {
            ...state.GroupMessages,
            [key]: updatedMessages,
          },
        };
      } else {
        // If the key doesn't exist, add the new data to the GroupMessages object
        return {
          ...state,
          GroupMessages: {
            ...state.GroupMessages,
            [key]: chats,
          },
        };
      }

    case FETCH_USER_TIME:
      return {
        ...state,
        FetchUserTime: action.payload,
      };

    case CATEGORIES:
      return {
        ...state,
        category: action.payload,
      };
    case CART:
      return {
        ...state,
        CartItems: action.payload,
      };

    case ITEMS:
      return {
        ...state,
        Items: action.payload,
      };

    case SURPRISES:
      return {
        ...state,
        SurpriseState: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
