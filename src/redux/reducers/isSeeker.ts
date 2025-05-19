import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface IsSeekState {
  value: boolean;
}

const initialState: IsSeekState = {
  value: false,
};

const isSeekerSlice = createSlice({
  name: "isSeek",
  initialState,
  reducers: {
    setIsSeeker: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setIsSeeker } = isSeekerSlice.actions;
export default isSeekerSlice.reducer;
