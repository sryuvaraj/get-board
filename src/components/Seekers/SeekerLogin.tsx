import { useRouter } from 'next/navigation'
import React from 'react'

const SeekerLogin = () => {
    const router = useRouter()
    const seekerRegister = () => {
        router.push("/seeker/seekerRegister")
    }
  return (
    <div>SeekerLogin
        <p onClick={seekerRegister}>Seeker Register</p>
    </div>
  )
}

export default SeekerLogin