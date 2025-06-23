import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoggedInUserType {
  name: string;
  email: string;
  role?: string;        // optional: "recruiter" | "seeker"
  token?: string;       // optional if you're storing auth token
}

interface LoggedInUserState {
  user: LoggedInUserType | null;
}

const initialState: LoggedInUserState = {
  user: null,
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<LoggedInUserType>) => {
      state.user = action.payload;
    },
    clearLoggedInUser: (state) => {
      state.user = null;
    },
  },
});

export const { setLoggedInUser, clearLoggedInUser } = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
