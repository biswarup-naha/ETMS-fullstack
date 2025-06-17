import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/auth';


interface AuthState {
  user: User | null;
  token: string | null;
}

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState: AuthState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (values: { email: string; password: string; role: string }, thunkAPI) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, values);
//       const { data, token } = res.data;
//       return { user: data as User, token };
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
//     }
//   }
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    login: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
  //       state.loading = false;
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;

  //       localStorage.setItem('user', JSON.stringify(action.payload.user));
  //       localStorage.setItem('token', action.payload.token);
  //     })
  //     .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
