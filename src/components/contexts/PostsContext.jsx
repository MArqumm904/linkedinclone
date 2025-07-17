// contexts/PostsContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  textPosts: [],
  imagePosts: [],
  videoPosts: [],
  isLoading: false,
  error: null
};

// Action types
const ActionTypes = {
  SET_TEXT_POSTS: 'SET_TEXT_POSTS',
  SET_IMAGE_POSTS: 'SET_IMAGE_POSTS',
  SET_VIDEO_POSTS: 'SET_VIDEO_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  ADD_POST: 'ADD_POST',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE'
};

// Reducer function
const postsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TEXT_POSTS:
      return { ...state, textPosts: action.payload };
    
    case ActionTypes.SET_IMAGE_POSTS:
      return { ...state, imagePosts: action.payload };
    
    case ActionTypes.SET_VIDEO_POSTS:
      return { ...state, videoPosts: action.payload };
    
    case ActionTypes.UPDATE_POST:
      const { postType, postId, updatedData } = action.payload;
      return {
        ...state,
        [postType]: state[postType].map(post => 
          post.id === postId ? { ...post, ...updatedData } : post
        )
      };
    
    case ActionTypes.DELETE_POST:
      const { postType: deleteType, postId: deleteId } = action.payload;
      return {
        ...state,
        [deleteType]: state[deleteType].filter(post => post.id !== deleteId)
      };
    
    case ActionTypes.ADD_POST:
      const { postType: addType, postData } = action.payload;
      return {
        ...state,
        [addType]: [...state[addType], postData]
      };
    
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ActionTypes.LOAD_FROM_STORAGE:
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
};

// Create context
const PostsContext = createContext();

// Storage keys
const STORAGE_KEYS = {
  TEXT_POSTS: 'textPosts',
  IMAGE_POSTS: 'imagePosts',
  VIDEO_POSTS: 'videoPosts'
};

// Provider component
export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  // Load from memory on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  // Save to memory whenever state changes
  useEffect(() => {
    saveToStorage();
  }, [state.textPosts, state.imagePosts, state.videoPosts]);

  // Storage functions (using in-memory storage)
  const memoryStorage = {
    textPosts: [],
    imagePosts: [],
    videoPosts: []
  };

  const saveToStorage = () => {
    memoryStorage.textPosts = state.textPosts;
    memoryStorage.imagePosts = state.imagePosts;
    memoryStorage.videoPosts = state.videoPosts;
  };

  const loadFromStorage = () => {
    try {
      const loadedData = {
        textPosts: memoryStorage.textPosts || [],
        imagePosts: memoryStorage.imagePosts || [],
        videoPosts: memoryStorage.videoPosts || []
      };
      dispatch({ type: ActionTypes.LOAD_FROM_STORAGE, payload: loadedData });
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  };

  // Action creators
  const actions = {
    setTextPosts: (posts) => {
      dispatch({ type: ActionTypes.SET_TEXT_POSTS, payload: posts });
    },

    setImagePosts: (posts) => {
      dispatch({ type: ActionTypes.SET_IMAGE_POSTS, payload: posts });
    },

    setVideoPosts: (posts) => {
      dispatch({ type: ActionTypes.SET_VIDEO_POSTS, payload: posts });
    },

    updatePost: (postType, postId, updatedData) => {
      dispatch({
        type: ActionTypes.UPDATE_POST,
        payload: { postType, postId, updatedData }
      });
    },

    deletePost: (postType, postId) => {
      dispatch({
        type: ActionTypes.DELETE_POST,
        payload: { postType, postId }
      });
    },

    addPost: (postType, postData) => {
      dispatch({
        type: ActionTypes.ADD_POST,
        payload: { postType, postData }
      });
    },

    setLoading: (loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    },

    initializePosts: (textPosts, imagePosts, videoPosts) => {
      dispatch({ type: ActionTypes.SET_TEXT_POSTS, payload: textPosts });
      dispatch({ type: ActionTypes.SET_IMAGE_POSTS, payload: imagePosts });
      dispatch({ type: ActionTypes.SET_VIDEO_POSTS, payload: videoPosts });
    }
  };

  const value = {
    state,
    actions,
    // Computed values
    totalPosts: state.textPosts.length + state.imagePosts.length + state.videoPosts.length,
    allPosts: [...state.textPosts, ...state.imagePosts, ...state.videoPosts]
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export default PostsContext;