import { useRouter } from 'next/navigation'
import React from 'react'

const RecruiterLogin = () => {

  const router = useRouter()

  const recruiterRegister = () => {
    router.push("/recruiter/recruiterRegister")
  }

  return (
    <div>RecruiterLogin
      <p  onClick={recruiterRegister}>Recruiter Register</p>
    </div>
  )
}

export default RecruiterLogin