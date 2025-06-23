import { configureStore } from '@reduxjs/toolkit'
import isSeekerReducer from "@/redux/reducers/isSeeker"
import loggedInReducer from './reducers/loggendInUser'

export const store = configureStore({
  reducer: {
    isSeekerr:isSeekerReducer,
    loggedInUser:loggedInReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;