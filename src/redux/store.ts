import { configureStore } from '@reduxjs/toolkit'
import isSeekerReducer from "@/redux/reducers/isSeeker"
import loggerInUserReducer from "@/redux/reducers/loggendInUser"

const store = configureStore({
  reducer: {
    isSeekerr:isSeekerReducer
  },
})

export default store