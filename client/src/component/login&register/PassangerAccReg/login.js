import * as React from 'react';
import { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import './styles/login.css';
import Header from '../../home/ChildComp/header';
import {LoginbuttonsStyles} from '../../../component/colorplatte'
//redux
import { login } from '../../../redux/action/index';
import { useSelector, useDispatch } from 'react-redux';

import Axios from 'axios';


export default function Login(props) {
  const dispatch = useDispatch();
  
  /*Input Values getter */
  const intialValues = {
    email: "",
    password: ""
  }
  const changeHandler = e => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }
  const [values, setvalues] = useState(intialValues);
  /*Input Values getter */

  let Navigate = useNavigate();
  const handleLogin = () => {
    Axios.post("http://localhost:3001/api/Passangerlogin", { password: values.password, email: values.email }).then((response) => {
      if (((response.data.map(val => val.email)).length) > 0) {
        dispatch(login({type:"Passanger",id:response.data.map(val => val.ID)[0],loginstate:true}));
        Navigate('../PassangerAcc');
      }
      else {
        alert('wrong username or password');
      }
    });
  }

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
            helperText="Please enter your Email"
            id="Email"
            label="Email"
            name="email"
            type="email"
            value={values.email}
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
          <p><Link to="/register">Forgot password</Link></p>
          <Button className='button' variant="contained" onClick={handleLogin}
            sx={LoginbuttonsStyles}>
            Login</Button>
          <h1>OR</h1>
          <Button variant="contained" type="submit"
            sx={LoginbuttonsStyles}>
            <FacebookIcon> </FacebookIcon> Login with facebook
          </Button>
          <Button className='button' variant="contained" type="submit"
            sx={LoginbuttonsStyles}>
            <GoogleIcon> </GoogleIcon> Login with Google
          </Button>
          <p>If you are a new user. <Link to="/PassangerRegister">Signup here</Link></p>
        </div>
      </Box>
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
        <h1>Happy Passanging!</h1>
      </Box>

    </div>
  );
};
