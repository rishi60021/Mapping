import React, { useRef, useState } from 'react';
import "./Login.css";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

const Login = ({ setshowlogin, mystorage, setcurrentuser }) => {
  const [fail, setfail] = useState(false);
  const nameref = useRef();
  const passwordref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameref.current.value,
      password: passwordref.current.value,
    };
    try {
      const res = await axios.post("http://localhost:8871/api/users/login", user);
      if (res.status === 200) {
        mystorage.setItem("user", res.data.username);
        setcurrentuser(res.data.username); // Set the current user
        setshowlogin(false);
        setfail(false);
      } else {
        setfail(true);
      }
    } catch (err) {
      setfail(true);
    }
  };

  return (
    <div className='logincontainer'>
      <div className='logo'></div>
      <form onSubmit={handleSubmit}>
        <label>Enter name:</label>
        <input type="text" placeholder='username' ref={nameref}></input>
        <label>Enter password:</label>
        <input type="password" placeholder="password" ref={passwordref} />
        <button className='loginbtn'>log-in</button>
        {fail && <span className="failure">Something went wrong</span>}
      </form>
      <CloseIcon className='login-cancel' onClick={() => setshowlogin(false)} />
    </div>
  );
};

export default Login;
