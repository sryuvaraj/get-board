import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/types/type";

interface LoggedInUserState {
  user: User | null;
}

const initialState: LoggedInUserState = {
  user: null,
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearLoggedInUser: (state) => {
      state.user = null;
    },
  },
});

export const { setLoggedInUser, clearLoggedInUser } = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
