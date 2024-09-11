import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface authInitialState {
  userInfo:
    | undefined
    | {
        uid: string;
        email: string;
        name: string;
        photoURL: string;
      };
  isDarkTheme: boolean;
}

const initialState: authInitialState = {
  userInfo: undefined,
  isDarkTheme: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeTheme: (
      state,
      action: PayloadAction<{
        isDarkTheme: boolean;
      }>,
    ) => {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        name: string;
        photoURL: string;
      }>,
    ) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser, changeTheme } = authSlice.actions;
