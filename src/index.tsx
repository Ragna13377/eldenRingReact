import { createRoot } from 'react-dom/client';
import '@shared/styles/global.scss';
import App from '@/app/App';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(<App />);
