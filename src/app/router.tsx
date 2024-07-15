import { createHashRouter } from 'react-router-dom';
import Game from '@processes/Game/Game';

export const router = createHashRouter([
	{
		path: '/',
		element: <Game />,
	},
]);
