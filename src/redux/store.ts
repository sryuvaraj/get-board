import { configureStore } from '@reduxjs/toolkit'
import isSeekerReducer from "@/redux/reducers/isSeeker"

const store = configureStore({
  reducer: {
    isSeekerr:isSeekerReducer
  },
})

export default store