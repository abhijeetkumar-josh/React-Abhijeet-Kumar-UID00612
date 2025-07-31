import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "@profile/UserCard";

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username: string | undefined; password: string },
    thunkAPI,
  ) => {
    if (!credentials.username) {
      return thunkAPI.rejectWithValue(
        "Username must be at least 1 character long",
      );
    }

    if (!credentials.password || credentials.password.length < 20) {
      return thunkAPI.rejectWithValue(
        "Password must be at least 20 characters long",
      );
    }

    try {
      const res = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${credentials.password}`,
        },
      });
      return { user: res.data, token: credentials.password };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.loading = true;
        state.error = null;
        state.token = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.token = null;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
