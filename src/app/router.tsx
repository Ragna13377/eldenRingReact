import { createBrowserRouter } from 'react-router-dom';
import Home from '@processes/Home/Home';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
]);
