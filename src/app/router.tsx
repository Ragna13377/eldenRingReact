import Game from '@processes/Game/Game';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
	{
		path: '/',
		element: <Game />,
	},
]);
