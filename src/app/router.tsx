import { createBrowserRouter } from 'react-router-dom';
import Game from '@processes/Game/Game';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Game />,
	},
]);
