import login_bg from '@/assets/login_bg.png';
import logo from '@/assets/logo.webp';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';

import ThemeSwitch from '@/components/Switch';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/AuthSlice';
import { firebaseAuth, firebaseDB, usersRef } from '@/utils/firebaseConfig';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/');
  });
  // TODO: add github login
  const loginGithub = async () => {};
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid, photoURL },
    } = await signInWithPopup(firebaseAuth, provider);
    if (email) {
      const firestoreQuery = query(usersRef, where('uid', '==', uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, 'users'), {
          uid,
          name: displayName,
          email,
          photoURL,
        });
      }
      dispatch(
        setUser({
          uid,
          email,
          name: displayName as string,
          photoURL: photoURL as string,
        }),
      );
      navigate('/home');
    }
  };

  return (
    <EuiProvider>
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: '100vw', height: '100vh', overflowY: 'auto' }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={login_bg} alt="login_bg" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                  <EuiImage
                    src={logo}
                    alt="logo"
                    size="64px"
                    style={{
                      borderRadius: '6px',
                    }}
                  />
                  <EuiText grow={false}>
                    <h2>
                      <EuiTextColor>Login</EuiTextColor>
                    </h2>
                  </EuiText>
                  <ThemeSwitch />
                </EuiFlexGroup>
                <EuiSpacer size="l" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton fill onClick={loginGithub}>
                  Login with Github
                </EuiButton>
                <EuiSpacer size="l" />
                <EuiButton fill onClick={loginGoogle}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
};

export default LoginPage;
