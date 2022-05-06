import React from 'react';
import { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import { Link,useNavigate } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import './styles/login.css';
import Header from '../../home/ChildComp/header';
import { SignInWithGoogle, SignInWithFacebook } from "./firebase";
import {LoginbuttonsStyles} from '../../../component/colorplatte'
import Axios from 'axios';

export default function Register() {
  /*Input Values getter */
  let Navigate = useNavigate();
  const [values, setvalues] = useState({});
  const changeHandler = e => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }
  console.log(values)
  /*Input Values getter */
  const handleRegister = () => {
    if ((!values.email) && (!values.password)) {
      alert("Email and password fields are requierd");
    } else if (values.password !== values.rePassword){
      alert("Passwords don't match");
    }
    else {
      Axios.post("http://localhost:3001/api/Passangerregister", { name:values.name, address:values.address,phone:values.phone, password: values.password, email: values.email }).then((response) => {
        alert("Insert Successfully");
      });
      Navigate('../PassangerLogin');
    }
  };

  /*Facebook Auth */
  return (
    <div>
      <Header></Header>
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          position: 'absolute',
          flexDirection: { md: 'row', xs: 'column' },
          width: { md: '50%', xs: 'auto' },
          p: 1,
          mt: '10%',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}>
          <div className='leftComp'>
            <h1> Welcome To One Way App</h1>
            <p>Connect with us and go anywhere</p>
          </div>

          <div className='righttComp'>
            <h1>Login To One Way App</h1>
            <TextField
            helperText="Please enter your Password"
            id="name"
            label="name"
            name="name"
            type="name"
            onChange={changeHandler}
            sx={{ m: 2 }}
          />
          <TextField
            helperText="Please enter your Email"
            id="Email"
            label="Email"
            name="email"
            type="email"
            onChange={changeHandler}
            sx={{ m: 2 }}
          />
          <TextField
            helperText="Please enter your Password"
            id="address"
            label="address"
            name="address"
            type="address"
            onChange={changeHandler}
            sx={{ m: 2 }}
          />
           <TextField
            helperText="Please enter your Password"
            id="phone"
            label="phone"
            name="phone"
            type="phone"
            onChange={changeHandler}
            sx={{ m: 2 }}
          />  
            <TextField
              helperText="Please enter your Password"
              id="password"
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={changeHandler}
              sx={{ m: 2 }}
            />
            <TextField
              id="rePassword"
              label="Re-Enter Password"
              name="rePassword"
              type="password"
              value={values.rePassword}
              onChange={changeHandler}
              sx={{ m: 2 }}
            />
            <Button variant="contained" onClick={handleRegister}
              sx={LoginbuttonsStyles}>
              Signup</Button>
            <h1>OR</h1>
            <Button variant="contained" onClick={SignInWithFacebook}
              sx={LoginbuttonsStyles}
            >
              <FacebookIcon> </FacebookIcon> Signup with facebook
            </Button>
            <Button variant="contained" onClick={SignInWithGoogle}
              sx={LoginbuttonsStyles}>
              <GoogleIcon> </GoogleIcon> Signup with Google
            </Button>
          </div>
        </Box>
        <p>{values.email}</p>
        <Box
          sx={{
            position: 'absolute',
            float: 'right',
            display: { sm: 'none', xs: 'none', md: 'inline' },
            width: { md: '40%', xs: 'auto' },
            p: 1,
            mt: '20%',
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: '700',
            background: 'rgba(255,255,255,0.7)',
            right: '5%',
            color: 'black',
            overflow: 'hidden'
          }}
        >
          <h4>Patience is something you admire in the driver behind you and scorn in the one ahead.</h4>
          <h1>Happy Driving!!</h1>
        </Box>
    </div>
  )
}
