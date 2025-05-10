"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const router = useRouter()

  const [name, setName] = useState("");
 

  const recruterLogin = () => {
    router.push("/recruiter/recruiterLogin")
  }

  const seekerLogin = () => {
    router.push("/seeker/seekerLogin")
  }

  return (
    <div className="">
      <div>
        <p onClick={recruterLogin}>Recriter Login</p>
        <p onClick={seekerLogin}>Job Seeker Login</p>
      </div>
    </div>
  );
}
