import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { persistor, store } from './store';
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
        <Suspense fallback={<></>}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>,
  );
}
