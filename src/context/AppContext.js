import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  events: [],
  reviews: [],
  courses: [],
  elections: [],
  questions: [],
  feedback: [],
  notifications: [],
  loading: false,
  error: null
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    case 'ADD_COURSE_RATING':
      return { ...state, courses: [...state.courses, action.payload] };
    case 'SET_ELECTIONS':
      return { ...state, elections: action.payload };
    case 'ADD_ELECTION':
      return { ...state, elections: [...state.elections, action.payload] };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'ADD_QUESTION':
      return { ...state, questions: [...state.questions, action.payload] };
    case 'SET_FEEDBACK':
      return { ...state, feedback: action.payload };
    case 'ADD_FEEDBACK':
      return { ...state, feedback: [...state.feedback, action.payload] };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    state,
    dispatch,
    // Helper functions
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    addNotification: (notification) => dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    clearNotifications: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' })
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;