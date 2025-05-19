import React, { useState } from 'react'
import SeekerLogin from './SeekerLogin'
import { useRouter } from 'next/navigation'
import { strict } from 'assert'
import {registerSeeker as regseek} from '@/api/seekersApis/services'


interface seekerRegisterFormType{
  name:string,
  userName:string,
  email:string,
  password:string,
  confirmPassword:string,
}

const SeekerRegister = () => {
  const router = useRouter()


  const initalFormData:seekerRegisterFormType = {
    name:"",
    userName:"",
    email:"",
    password:"",
    confirmPassword:"",
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [erros, setErros] = useState<any>({})
  const [formData, setFormData] = useState<seekerRegisterFormType>(initalFormData)

  const seekerLogin = () => {
    router.push("/seeker/seekerLogin")
  }

  const handleChange = (e:any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]:value})
  }

  const validateForm = () => {
    const errors:any = {}
    if(!formData?.name) errors.name = "Can't be empty"
    if(!formData?.userName) errors.userName = "Can't be empty"
    if(!formData?.email) errors.email = "Can't be empty"
    if(!formData?.password) errors.password = "Can't be empty"
    if(formData?.password === formData?.confirmPassword) errors.name = "PassWOrd and Confirm password should be same"
  }

  const registerSeeker = async () => {
    try{
      const isValid = validateForm()
      
      setIsLoading(true)
      const res = await regseek(formData)
      console.log(formData, "seeeker refiter form")
    }
    catch(err:any){

    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div>
        <div>
          <label>
            <p>Name/</p>
            <input type='text' placeholder='' name='name' value={formData?.name} onChange={handleChange} />
          </label>
          <label>
            <p>username</p>
            <input type='text' placeholder='' name='userName' value={formData?.userName} onChange={handleChange} />
          </label>
          <label>
            <p>email</p>
            <input type='email' placeholder='' name='email' value={formData?.email} onChange={handleChange} />
          </label>
          <label>
            <p>Password</p>
            <input type='password' placeholder='' name='password' value={formData?.password} onChange={handleChange} />
          </label>
          <label>
            <p>Confirm Password</p>
            <input type='password' placeholder='' name='confirmPassword' value={formData?.confirmPassword} onChange={handleChange} />
          </label>
          
          <p onClick={registerSeeker}>register seeker</p>
            
            
            
        </div>
      </div>
      <p onClick={seekerLogin}>seeker Login</p>
    </div>
  )
}

export default SeekerRegister