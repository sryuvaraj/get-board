"use client";

import Providers from "@/components/Providers";
import { setIsSeeker } from "@/redux/reducers/isSeeker";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch()

  const [name, setName] = useState("");

  const recruterLogin = () => {
    dispatch(setIsSeeker(false))
    router.push("/recruiter/recruiterLogin");
  };

  const seekerLogin = () => {
    alert("")
    dispatch(setIsSeeker(true))
    router.push("/seeker/seekerLogin");
  };

  return (
    
      <div>
        <p onClick={recruterLogin}>Recriter Login</p>
        <p onClick={seekerLogin}>Job Seeker Login</p>
      </div>
  );
}
