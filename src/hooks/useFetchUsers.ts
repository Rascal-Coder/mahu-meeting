import { useAppSelector } from '@/store/hooks';
import type { UserType } from '@/typings';
import { usersRef } from '@/utils/firebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function useFetchUsers() {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const uid = useAppSelector((app) => app.auth.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getUser = async () => {
        const firestoreQuery = query(usersRef, where('uid', '!=', uid));
        const data = await getDocs(firestoreQuery);
        const firebaseUsers: Array<UserType> = [];

        // biome-ignore lint/complexity/noForEach: <explanation>
        data.forEach((user) => {
          const userData: UserType = user.data() as UserType;
          firebaseUsers.push({
            ...userData,
            label: userData.name,
          });
        });
        setUsers(firebaseUsers);
      };
      getUser();
    }
  }, [uid]);
  return [users];
}

export default useFetchUsers;
