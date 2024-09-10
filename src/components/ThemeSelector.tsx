import type { EuiThemeColorMode } from '@elastic/eui';
import { type ReactNode, Suspense, lazy, useEffect, useState } from 'react';

const LightTheme = lazy(() => import('./Themes/LightTheme'));
const DarkTheme = lazy(() => import('./Themes/DarkTheme'));

export default function ThemeSelector({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<EuiThemeColorMode>('light');
  useEffect(() => {
    const theme = localStorage.getItem('zoom-theme');
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<div>loding...</div>}>
        {theme === 'dark' ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
}
