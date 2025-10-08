import axios from "axios"
import { JobData, RecruitersRegForm, SeekersRegForm } from "@/types/formDataTypes";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const fetchRecruiters = async () => {
        try {
          const res = await axios.get(`${baseUrl}/recruiters`);
          return res.data
        } catch (err) {
          console.error("Failed to fetch recruiters", err);
          return err
        }
      };

     export const fetchSeekers = async () => {
        try {
          const res = await axios.get(`${baseUrl}/seekers`);
          return res.data
        } catch (err) {
          console.error("Failed to fetch recruiters", err);
          return err
        }
      };

      export const fetchUsers = async () => {
        try {
          const res = await axios.get(`${baseUrl}/users`);
          return res.data
        } catch (err) {
          console.error("Failed to fetch recruiters", err);
          return err
        }
      };

export const registerSeeker = async (body:SeekersRegForm) => {
    try{
        const resUser = await axios.post(`${baseUrl}/users`, body)
        // const resSeeker = await axios.post(`${baseUrl}/seekers`, body)
        return resUser.data
    }
    catch(err) {
        alert(err)
    }
}


export const registerRecruiter = async (body:RecruitersRegForm) => {
    try{
        const resUser = await axios.post(`${baseUrl}/users`, {...body,role:"recruiter"})
        const resReciteres = await axios.post(`${baseUrl}/recruiters`, body)
    
        // const resSeeker = await axios.post(`${baseUrl}/recruiters`, body)
    return resUser.data
    }
    catch(err) {
        alert(err)
    }
}


export const addJOb = async (body:JobData) => {
  try{
    const res = await axios.post(`${baseUrl}/jobList`, body)
    return res?.data
  }
  catch(err) {
    return err
  }
}


export const fetchJobs = async () => {
  try{
    const res = await axios.get(`${baseUrl}/jobList`)
    return res?.data
  }
  catch(err) {
    return err
  }
}