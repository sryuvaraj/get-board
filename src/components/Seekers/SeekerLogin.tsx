import { setIsSeeker } from '@/redux/reducers/isSeeker'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleLoginButton from '../General/GoogleLoginButton'


interface loginFormType {
  email:string,
  password:string
}

const SeekerLogin = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const initialForm:loginFormType = {
      email : "",
      password :""
    }

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<loginFormType>(initialForm)

    const isSeeker = useSelector((state:any) => state?.isSeekerr?.value)

    const seekerRegister = () => {
        router.push("/seeker/seekerRegister")
    }

    const handleChange = (e:any) => {
      const {name, value} = e.target
      setFormData({...formData, [name]:value})
    }

    const loginSeeker = () => {
      try{
        setIsLoading(true)
        console.log(formData, "loginseekerFOrm")
      }
      catch(err:any){

      }

      finally{
        setIsLoading(false)
      }
    }

  return (
    <div>SeekerLogin
      <input type='email' onChange={handleChange} name="email" value={formData?.email} placeholder='e,mail' />
      <input type='password' onChange={handleChange} name="password" value={formData?.password} placeholder='password' />
      <p onClick={loginSeeker}>Login</p>
        <p onClick={seekerRegister}>Seeker Register</p>
        <div><GoogleLoginButton /></div>
    </div>
  )
}

export default SeekerLogin