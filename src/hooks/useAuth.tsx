import { setUser } from '@/store/slices/AuthSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebaseConfig';

export default function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate('/login');
      else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email as string,
            name: currentUser.displayName as string,
            photoURL: currentUser.photoURL as string,
          }),
        );
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);
}
