import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ME_QUERY } from "../../GraphqlOprations/queries";

type User = {
  id: string;
  firstName: string;
  surname: string;
  email: string;
};

type Status = "idle" | "loading" | "succeeded" | "failed";

type UserState = {
  user: User | null;
  status: Status;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchMe = createAsyncThunk<User>(
  "user/fetchMe",
  async () => {
    const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ query: ME_QUERY }),
    });
    const json = await res.json();
    if (json.errors && json.errors.length) {
      throw new Error(json.errors[0].message || "Failed to load user");
    }
    return json.data.me as User;
  }
);

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: { payload: User | null }) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;

