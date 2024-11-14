import React, { useRef, useState } from 'react'
import "./Register.css"
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close';

const Register = ({setshowregister}) => {
    const [success,setsuccess]=useState(false);
    const[fail,setfail]=useState(false);
    const nameref=useRef();
    const emailref=useRef();
    const passwordref=useRef();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const newuser={
            username:nameref.current.value,
            email:emailref.current.value,
            password:passwordref.current.value,
        };
        try{
            await axios.post("/api/users/signup",newuser);
            setfail(false)
            setsuccess(true)

        }catch(err){
            setfail(true);
        }

    };
  return (
    <div className='registercontainer'>
        <div className='logo'></div>
       <form onSubmit={handleSubmit}>
        <label>Enter name:</label>
        <input type="text" placeholder='username' ref={nameref}></input>
        <label>Enter email:</label>
        <input type="email" placeholder="email" ref={emailref}/>
        <label>Enter password:</label>
        <input type="password" placeholder="password" ref={passwordref}/>
        <button className='registerbtn'>Register</button>
        {success&&<span className='success'>Its Success you can login now</span>}
        {fail&&<span className="failure">something wrong</span>}
        
        


       </form>

      <CloseIcon className='register-cancel'onClick={()=>setshowregister(false)}/>
    </div>
  )
}

export default Register
