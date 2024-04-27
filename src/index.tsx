import { createRoot } from 'react-dom/client';
import '@shared/styles/global.scss';
import App from '@/app';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
		<App />
	</DndProvider>
);
