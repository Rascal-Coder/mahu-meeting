import { useAppSelector } from '@/store/hooks';
import { setUser } from '@/store/slices/AuthSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebaseConfig';

export default function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginType = useAppSelector((app) => app.auth.loginType);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate('/login');
      else {
        if (loginType === 'google') {
          dispatch(
            setUser({
              uid: currentUser.uid,
              email: currentUser.email as string,
              name: currentUser.displayName as string,
              photoURL: currentUser.photoURL as string,
            }),
          );
        }
        if (loginType === 'github') {
          const { uid, photoURL } = currentUser;
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          const githubUserInfo = (currentUser as any).reloadUserInfo
            .providerUserInfo[0];
          const { screenName, email } = githubUserInfo;
          dispatch(
            setUser({
              uid,
              email,
              name: screenName,
              photoURL: photoURL as string,
            }),
          );
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);
}
