import { configureStore } from '@reduxjs/toolkit'
import isSeekerReducer from "@/redux/reducers/isSeeker"
import loggedInReducer from './reducers/loggendInUser'

const store = configureStore({
  reducer: {
    isSeekerr:isSeekerReducer,
    loggedInUser:loggedInReducer
  },
})

export default store