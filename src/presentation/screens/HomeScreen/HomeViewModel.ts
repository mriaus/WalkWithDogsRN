import { createViewModel } from '@presentation/viewModels/createViewModel';

type HomeState = {
  isLoading: boolean;
  error: string | null;
};

type HomeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: HomeState = {
  isLoading: false,
  error: null,
};

const homeReducer = (state: HomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const { Provider: HomeViewModelProvider, useViewModel: useHomeViewModel } =
  createViewModel(homeReducer, initialState);

export { HomeViewModelProvider, useHomeViewModel };
