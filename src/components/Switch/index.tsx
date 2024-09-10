import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
function ThemeSwitch() {
  const switchRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const switchElement = switchRef.current;
    toggleRef.current?.addEventListener('change', () => {
      const currentTheme = switchElement?.getAttribute('data-theme');
      switchElement?.setAttribute(
        'data-theme',
        currentTheme === 'dark' ? 'light' : 'dark',
      );
    });
  }, []);
  return (
    <>
      <div className={styles.switch} ref={switchRef} data-theme="dark">
        <input type="checkbox" name="toggle" ref={toggleRef} />
        <label htmlFor="toggle">
          <i className={styles.bulb}>
            <span className={styles.bulbCenter} />
            <span className={styles.filament1} />
            <span className={styles.filament2} />
            <span className={styles.reflections}>
              <span />
            </span>
            <span className={styles.sparks}>
              <i className={styles.spark1} />
              <i className={styles.spark2} />
              <i className={styles.spark3} />
              <i className={styles.spark4} />
            </span>
          </i>
        </label>
      </div>
    </>
  );
}

export default ThemeSwitch;
