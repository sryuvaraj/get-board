"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsSeeker } from "@/redux/reducers/isSeeker";
import { fetchSeekers, fetchRecruiters } from "@/api/seekersApis/services";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [recruitersList, setRecruitersList] = useState<any>([])
  const [seekersList, setIsSeekersList] = useState<any>([])

  const recruiterLogin = () => {
    dispatch(setIsSeeker(false));
    router.push("/recruiter/recruiterLogin");
  };

  const seekerLogin = () => {
    dispatch(setIsSeeker(true));
    router.push("/seeker/seekerLogin");
  };

  const loadUsers = async () => {
    try {
      const resRecruiters = await fetchSeekers();
      setRecruitersList(resRecruiters)
      const resSeekers = await fetchRecruiters();
      setIsSeekersList(resSeekers)
      // await fetchUsers(); // Add actual implementation if needed
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <p onClick={recruiterLogin}>Recruiter Login</p>
      <p onClick={seekerLogin}>Job Seeker Login</p>
    </div>
  );
}
