import React from 'react'
import SeekerLogin from './SeekerLogin'
import { useRouter } from 'next/navigation'

const SeekerRegister = () => {
  const router = useRouter()

  const seekerLogin = () => {
    router.push("/seeker/seekerLogin")
  }
  return (
    <div>SeekerRegister
      <p onClick={seekerLogin}>seeker Login</p>
    </div>
  )
}

export default SeekerRegister