import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';

const rootReducer = combineReducers({

});
export const store = configureStore({
	reducer: rootReducer,
});

type AppState = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch: () => AppState = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
