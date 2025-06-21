import axios from "axios"


export const registerSeeker = async (body:any) => {
    try{
        const resUser = await axios.post(`https://get-board-json-api.onrender.com/users`, body)
        const resSeeker = await axios.post(`https://get-board-json-api.onrender.com/seekers`, body)
    return resUser.data
    }
    catch(err) {
        alert(err)
    }
}


export const registerRecruiter = async (body:any) => {
    try{
        const resUser = await axios.post(`https://get-board-json-api.onrender.com/users`, body)
        const resSeeker = await axios.post(`https://get-board-json-api.onrender.com/recruiters`, body)
    return resUser.data
    }
    catch(err) {
        alert(err)
    }
}
