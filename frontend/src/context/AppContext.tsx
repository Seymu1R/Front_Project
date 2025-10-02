import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
interface Word {
  id: string;
  english: string;
  translation: string;
  dateAdded: string;
}

type ProficiencyLevel = 'Elementary' | 'Pre-Intermediate' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced';

interface AppState {
  aiToken: string | null;
  isAiReady: boolean;
  selectedLevel: ProficiencyLevel | null;
  generatedText: string | null;
  dictionary: Word[];
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_AI_TOKEN'; payload: string }
  | { type: 'SET_AI_READY'; payload: boolean }
  | { type: 'SET_SELECTED_LEVEL'; payload: ProficiencyLevel }
  | { type: 'SET_GENERATED_TEXT'; payload: string | null }
  | { type: 'ADD_WORD'; payload: Word }
  | { type: 'REMOVE_WORD'; payload: string }
  | { type: 'SET_DICTIONARY'; payload: Word[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial state
const initialState: AppState = {
  aiToken: localStorage.getItem('aiToken'),
  isAiReady: false,
  selectedLevel: null,
  generatedText: null,
  dictionary: [],
  isLoading: false,
  error: null,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_AI_TOKEN':
      localStorage.setItem('aiToken', action.payload);
      return {
        ...state,
        aiToken: action.payload,
        error: null,
      };
    case 'SET_AI_READY':
      return {
        ...state,
        isAiReady: action.payload,
      };
    case 'SET_SELECTED_LEVEL':
      return {
        ...state,
        selectedLevel: action.payload,
      };
    case 'SET_GENERATED_TEXT':
      return {
        ...state,
        generatedText: action.payload,
      };
    case 'ADD_WORD':
      return {
        ...state,
        dictionary: [...state.dictionary, action.payload],
      };
    case 'REMOVE_WORD':
      return {
        ...state,
        dictionary: state.dictionary.filter(word => word.id !== action.payload),
      };
    case 'SET_DICTIONARY':
      return {
        ...state,
        dictionary: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Action creators
export const actions = {
  setAiToken: (token: string): AppAction => ({
    type: 'SET_AI_TOKEN',
    payload: token,
  }),
  setAiReady: (ready: boolean): AppAction => ({
    type: 'SET_AI_READY',
    payload: ready,
  }),
  setSelectedLevel: (level: ProficiencyLevel): AppAction => ({
    type: 'SET_SELECTED_LEVEL',
    payload: level,
  }),
  setGeneratedText: (text: string | null): AppAction => ({
    type: 'SET_GENERATED_TEXT',
    payload: text,
  }),
  addWord: (word: Word): AppAction => ({
    type: 'ADD_WORD',
    payload: word,
  }),
  removeWord: (id: string): AppAction => ({
    type: 'REMOVE_WORD',
    payload: id,
  }),
  setDictionary: (words: Word[]): AppAction => ({
    type: 'SET_DICTIONARY',
    payload: words,
  }),
  setLoading: (loading: boolean): AppAction => ({
    type: 'SET_LOADING',
    payload: loading,
  }),
  setError: (error: string | null): AppAction => ({
    type: 'SET_ERROR',
    payload: error,
  }),
};

// Export types for use in other components
export type { Word, ProficiencyLevel, AppState };