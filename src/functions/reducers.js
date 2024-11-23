const postReducer = (state, action) => {
  switch (action.type) {
    case "POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "POSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case "PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    case "PROFILE_POSTS":
      return {
        loading: false,
        profile: { ...state.profile, posts: action.payload },
        error: "",
      };
    case "PROFILE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const photoReducer = (state, action) => {
  switch (action.type) {
    case "PHOTO_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "PHOTO_SUCCESS":
      return {
        ...state,
        loading: false,
        photos: action.payload,
        error: "",
      };
    case "PHOTO_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const friendsReducer = (state, action) => {
  switch (action.type) {
    case "FRIENDS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "FRIENDS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case "FRIENDS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { postReducer, profileReducer, photoReducer,friendsReducer };
