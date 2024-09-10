import { lazy } from 'react';
import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider } from '@elastic/eui';
import { RouteContainer } from './router';
const App = () => (
  <EuiProvider colorMode="light">
    <RouteContainer />
  </EuiProvider>
);
export default App;
