"use client";

import Providers from "@/components/Providers";
import { setIsSeeker } from "@/redux/reducers/isSeeker";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchSeekers as fSeekers} from "@/api/seekersApis/services"
import {fetchRecruiters as fRecruiters} from "@/api/seekersApis/services"

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const recruterLogin = () => {
    dispatch(setIsSeeker(false));
    router.push("/recruiter/recruiterLogin");
  };

  const seekerLogin = () => {
    dispatch(setIsSeeker(true));
    router.push("/seeker/seekerLogin");
  };

  const fetchSeekers = async () => {
    const res = await fSeekers()
  };

  const fetchRecruiters = async () => {
    const res = await fRecruiters()
  };

  const fetchUsers = () => {};

  useEffect(() => {
    fetchRecruiters();
    fetchSeekers();
    fetchUsers();
  }, []);

  return (
    <div>
      <p onClick={recruterLogin}>Recriter Login</p>
      <p onClick={seekerLogin}>Job Seeker Login</p>
    </div>
  );
}
