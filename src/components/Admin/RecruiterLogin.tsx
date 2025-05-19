import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const RecruiterLogin = () => {

  const router = useRouter()
  const isSeeker = useSelector((state:any) => state?.isSeekerr?.value)
    alert(isSeeker)


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