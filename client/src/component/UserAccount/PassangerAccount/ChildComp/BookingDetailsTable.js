import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {BasicbuttonsStyles} from '../../../colorplatte'

import Axios from 'axios';

import { Booking } from '../../../../redux/action/index';

import {useDispatch,useSelector} from 'react-redux';

export default function BookingTable() {  

  const dispatch = useDispatch();

  const isLogged = useSelector((state)=>state.user.value.loginstate);
  const type = useSelector((state)=>state.user.value.type);
  const passangerID = useSelector((state)=>state.user.value.id);
  /*DeleteButton */
  /*Dialog Alerts  */
  const [delopen, setDelOpen] = React.useState(false);
  const initialstate = {
    id:""
  } 
  const[TravelDetailID, setTravelDetailID] = useState(initialstate);
  const DelhandleClickOpen = (id) => async (event) => {
    if ((isLogged) && (type=='Passanger')){
      event.stopPropagation();
      setDelOpen(true);
      setTravelDetailID(id)       
  } else
  {
    setDelOpen(true)
  }     
  };
  
  
  const Agreehandle = () => {      
    if (TravelDetailID.id!=='') {
      Axios.post("http://localhost:3001/api/deletepassangerTravelDetails", { TravelDetailID:TravelDetailID.id,passangerID:passangerID }).then(() => {
          alert('successful insert');
      });
    }      
    setDelOpen(false);
  };
  
    
  
  const DelhandleClose = () => {
    setDelOpen(false);
  };
  /*Dialog Alerts  */
  function DeleteButton(id) {
    return (
      < Button
        onClick={DelhandleClickOpen(id)}
        sx={BasicbuttonsStyles}
      >< DeleteIcon /></Button>);
  }
  /*DeleteButton */

 

  /*Booking Details Table */
  const Boockingcolumns = [
    {
      field: 'Acction',
      headerName: 'Acction',
      width: 130,
      renderCell: ({id}) => (
        <DeleteButton id={id}></DeleteButton>
      ),
    },
    { field: 'id', headerName: 'Travel ID', width: 130 },
    { field: 'driver', headerName: 'Driver', width: 130 },
    { field: 'email', headerName: 'Driver Email', width: 130 },
    {field: 'phone', headerName: 'Phone', sortable: false,  width: 160, },
    { field: 'type', headerName: 'Vehicle', width: 130 },
    { field: 'date', headerName: 'Date And Time', width: 170 },
    { field: 'from', headerName: 'From', width: 170 },
    {
      field: 'To',
      headerName: 'To',
      type: 'number',
      width: 170,
    },   
    {
      field: 'discription',
      headerName: 'Discription',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'dateAndTimeOfBooking',
      headerName: 'Date Of Booked',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    }      
  ];

  const [bookingDetails, setbookingDetails] = useState([]);
   useEffect(() => {
       Axios.post("http://localhost:3001/api/BookingDetails",{passangerID}).then((response) => {
        setbookingDetails(response.data);        
       })
   },[]);      
   dispatch(Booking({numberOfBooking:bookingDetails.length}));
   const Boockingrows = bookingDetails.map((val, index, array) => ({
    id:val.travelDetailsID,
    driver:val.Name,
    email:val.email,
    type:val.type,
    date:val.date,
    from:val.from,
    To:val.To,
    phone:val.phone,
    discription:val.discription,
    dateAndTimeOfBooking:val.dateAndTimeOfBooking,
   }));
  /*Booking Details Table */
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          display: 'block',
          flexDirection: { md: 'row', xs: 'column' },
          boxShadow: 2,
          width: 'auto',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        <h1>My Booking</h1>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={Boockingrows}
            columns={Boockingcolumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
        {/* AddeButton Diolog Box */}
        <Dialog
          open={delopen}
          onClose={DelhandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={DelhandleClose}>Disagree</Button>
            <Button onClick={Agreehandle} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {/* AddeButton Diolog Box */}
      </Box>      
    </div>
  );
}
