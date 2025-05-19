import axios from "axios"


export const registerSeeker = async (body:any) => {
    try{
        const res = await axios.post(`https://get-board-json-api.onrender.com/users`, body)
    }
    catch(err) {
        alert(err)
    }
}
