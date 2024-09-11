import { useAppSelector } from '@/store/hooks';
import { changeTheme } from '@/store/slices/AuthSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';

function ThemeSwitch() {
  const dispatch = useDispatch();
  const switchRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLInputElement>(null);
  const isDarkTheme = useAppSelector((app) => app.auth.isDarkTheme);
  const [checked, setChecked] = useState(isDarkTheme);
  const invertTheme = () => {
    const theme = localStorage.getItem('mahu-theme');
    localStorage.setItem('mahu-theme', theme === 'light' ? 'dark' : 'light');
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };
  useEffect(() => {
    const theme = localStorage.getItem('mahu-theme') || 'light';
    setChecked(theme === 'dark');
  }, []);
  const handleToggle = () => {
    invertTheme();
    setChecked(!checked);
  };

  return (
    <>
      <div className={styles.switch} ref={switchRef}>
        <input
          type="checkbox"
          name="toggle"
          checked={checked} // 手动控制 checked 状态
          onChange={handleToggle}
          ref={toggleRef}
        />
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
