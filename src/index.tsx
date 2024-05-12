import { HTML5Backend } from 'react-dnd-html5-backend';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import App from '@/app';
import '@shared/styles/global.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
		<App />
	</DndProvider>
);
