import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {APIProvider} from '@vis.gl/react-google-maps';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const apiKey = import.meta.env.VITE_GMAPS_API_KEY;

root.render(
  <StrictMode>
    <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
      <App />
    </APIProvider>
  </StrictMode>,
);
