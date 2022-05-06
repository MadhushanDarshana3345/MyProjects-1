import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Rating, DialogContentText, InputLabel, Stack, Badge, Avatar, Box, styled, DialogTitle, Paper,TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './styles/PersonalDetails.css';
import {BorderbuttonsStyles,BasictextColor,BasicbuttonsStyles} from '../../../colorplatte'

import {useSelector} from 'react-redux';

import Axios from 'axios';

/*Item styled */
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  textAlign: 'start',
}));
const myboxShadow = { boxShadow: 1 };
/*Item styled */

/*Rating values & labales const*/
const labels = (value) => { 
    if (value<=0.5) {return 'Useless';}
    else if (value<=1){return 'Useless+';}
    else if (value<=1.5){return 'Poor';}
    else if (value<=2){return 'Poor+';}
    else if (value<=2.5){return 'Ok';}
    else if (value<=3) {return 'Ok+';}
    else if (value<=3.5) {return 'Good';}
    else if (value<=4) {return 'Good+';}
    else if (value<=4.5) {return 'Excellent';}
    else if (value<=4.5) {return 'Excellent';}
    else {return 'Excellent+';}
  
  
};
/*Rating values & labales const*/

/*Avatar styles*/
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
/*Avatar styles*/




export default function PersonalDetails() {
  const driverID = useSelector((state)=>state.user.value.id);
  /*Rating hooks */  
  const [value, setValue] = useState();
  /*Rating hooks */

  /*Personal details */

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [UpdatePersonalDetails, setUpdatePersonalDetails] = useState({});
  
  const changeHandler = e => {
    setUpdatePersonalDetails({ ...UpdatePersonalDetails, [e.target.name]: e.target.value })  }

  const handleAgree = () => {
    if (!UpdatePersonalDetails.FullName == '' && !UpdatePersonalDetails.PermanentAddress == '' && !UpdatePersonalDetails.Email == '' && !UpdatePersonalDetails.Phone == ''){
    Axios.post("http://localhost:3001/api/updateDriverPersonalDetails",{FullName:UpdatePersonalDetails.FullName,PermanentAddress:UpdatePersonalDetails.PermanentAddress,Email:UpdatePersonalDetails.Email,Phone:UpdatePersonalDetails.Phone,driverID:driverID}).then((response) => {
      alert('successful insert');
    })
    setOpen(false);
  }else{
    alert('Cpmplete All Field')
  }
  };

  const handleClose = () => {
    setOpen(false);
  };

 const [userDetails, setuserDetails] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/driverAcc",{driverID:driverID}).then((response) => {
      setuserDetails(response.data)
    })
  },[]);
  
  const [numberOFRatings, setnumberOFRatings] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/setnumberOFRatings",{driverID:driverID}).then((response) => {
      setnumberOFRatings(response.data)
    })
  },[]);
  const numberOFStart = numberOFRatings.map((val) => (val.numberOFRatings))
  return (
    <div>
      {userDetails.map((val, key) => {
        return (
          <div>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' },
                boxShadow: 2,
                width: 'auto',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                p: 1,
                m: 2,
                borderRadius: 2,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: '700',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Avatar alt={val.Name} src="/static/images/avatar/1.jpg" />
              <h4 className='detaillist'>Name : {val.Name} </h4>
              <h4 className='detaillist'>Permanent Address : {val.address} </h4>
              <h4 className='detaillist'>Email : {val.email}</h4>
              <h4 className='detaillist'>Driver ID : {val.ID}</h4>
              <h4 className='detaillist'>Phone : {val.phone}</h4>
              <h4 className='detaillist'>Ratings :
                <Rating
                  name="hover-feedback"
                  value={val.ratings/numberOFStart} //earned rating by drivers divided by number of drivers
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                  <font>{labels(val.ratings/numberOFStart)}</font>
                )}
              </h4>
              <Button sx={BorderbuttonsStyles} onClick={handleClickOpen}>
                Change
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle sx= {BasictextColor}>
                  {"Update Your Details"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText sx= {BasictextColor}>
                    <lable>Full Name:</lable>
                    <TextField fullWidth label="Full Name" id="FullName" onChange={changeHandler} name = 'FullName'/>
                    <lable>Permanent Address:</lable>
                    <TextField fullWidth label="Permanent Address" id="PermanentAddress" onChange={changeHandler} name = 'PermanentAddress'/>
                    <lable>Gmail:</lable>
                    <TextField fullWidth label="Gmail" id="Gmail" type='Email' onChange={changeHandler} name = 'Email'/>
                    <lable>Phone:</lable>
                    <TextField fullWidth label="Phone" id="Phone" onChange={changeHandler} name = 'Phone'/>

                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} sx= {BasicbuttonsStyles}>Disagree</Button>
                  <Button onClick={handleAgree} sx= {BasicbuttonsStyles} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </div>
        );
      })}
    </div>
  );
}
