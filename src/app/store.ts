import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import playerHandReducer from '@shared/services/PlayerHand/slice';
import playerArenaReducer from '@shared/services/PlayerArena/slice';
import draggableCardReducer from '@shared/services/DraggableCard/slice';
import inventoryReducer from '@shared/services/Inventory/slice';

const rootReducer = combineReducers({
	playerHand: playerHandReducer,
	playerArena: playerArenaReducer,
	draggableCard: draggableCardReducer,
	inventory: inventoryReducer,
});
export const store = configureStore({
	reducer: rootReducer,
});

type AppState = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch: () => AppState = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
