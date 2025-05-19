"use client"

import store from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'

const Providers = ({children}:any) => {
  return (
    <Provider store={store}>
    <div>
        {children}
    </div>
    </Provider>
  )
}

export default Providers