import { createSlice } from "@reduxjs/toolkit";

interface LoogerInUserType {
    id:string,
    emailId:string,
    token:string
}


const initialState = {
    value:{
        id:"",
        email:"",
        token:""
    }
}

export const loggedIn = createSlice({
    name:"loggedInU",
    initialState,
    reducers:{
        setLoggenInUser:(state:any, action:any) => {
            state.value = action.payload
        }
    }
})

export const {setLoggenInUser} = loggedIn.actions
export default loggedIn.reducer