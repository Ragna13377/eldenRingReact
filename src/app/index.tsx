import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import DndKitProvider from '@shared/dnd/DndKitProvider';
import { router } from '@/app/router';
import { store } from '@/app/store';

const App = () => (
	<StrictMode>
		<Provider store={store}>
			<DndKitProvider>
				<RouterProvider router={router} />
			</DndKitProvider>
		</Provider>
	</StrictMode>
);

export default App;
