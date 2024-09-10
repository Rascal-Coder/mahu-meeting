import '@elastic/eui/dist/eui_theme_light.css';
import ThemeSelector from '@/components/ThemeSelector';
import { useAppSelector } from '@/store/hooks';
import { setToasts } from '@/store/slices/MeetingSlice';
import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeProvider,
} from '@elastic/eui';
import type { EuiThemeColorMode } from '@elastic/eui/src/services/theme';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteContainer } from './router';
const App = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [isInitialEffect, setIsInitialEffect] = useState(true);
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);

  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id),
      ),
    );
  };
  const [theme, setTheme] = useState<EuiThemeColorMode>('light');
  useEffect(() => {
    const theme = localStorage.getItem('zoom-theme');
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem('zoom-theme', 'light');
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isInitialEffect) setIsInitialEffect(false);
    else {
      window.location.reload();
    }
  }, [isDarkTheme]);

  const overrides = {
    colors: {
      LIGHT: { primary: '#0b5cff' },
      DARK: { primary: '#0b5cff' },
    },
  };
  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <RouteContainer />
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
};
export default App;
