import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


interface registerFormDataProps {
  name:string
}

const RecruiterRegister = () => {

  const router = useRouter()

  const recruiterLogin = () => {
    router.push("/recruiter/recruiterLogin")
  }

  const [formData, setFormData] = useState<registerFormDataProps>({name:""})

  const handleChange = (e:any) => {
   const {name, value} = e.target
   setFormData((pre) => ({...pre, [name]:value}))
  }

  console.log(formData)

  
  const registerRecruiter = async () => {
    if (!formData?.name.trim()) return; // Prevent empty names

    try {
      const response = await fetch("https://get-board-json-api.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData?.name.trim(),
          id: "custom-id",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const data = await response.json();
      console.log("User added:", data);

      setFormData({name:""}); // Clear input after success
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>RecruiterRegister
      <div>
        <input type='text' value={formData?.name} name='name' onChange={handleChange} />
        <p onClick={registerRecruiter}>Register</p>
      </div>
      <p  onClick={recruiterLogin}>Recruiter Login</p>
    </div>
  )
}

export default RecruiterRegister