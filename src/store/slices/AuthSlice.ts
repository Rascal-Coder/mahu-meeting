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
  loginType: string;
}

const initialState: authInitialState = {
  userInfo: undefined,
  isDarkTheme: false,
  loginType: '',
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
    setLoginType: (state, action: PayloadAction<string>) => {
      state.loginType = action.payload;
    },
  },
});

export const { setUser, changeTheme, setLoginType } = authSlice.actions;
