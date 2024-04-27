import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import playerHandReducer from '@shared/services/PlayerHand/slice';
import playerArenaReducer from '@shared/services/PlayerArena/slice';

const rootReducer = combineReducers({
	playerHand: playerHandReducer,
	playerArena: playerArenaReducer,
});
export const store = configureStore({
	reducer: rootReducer,
});

type AppState = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch: () => AppState = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
