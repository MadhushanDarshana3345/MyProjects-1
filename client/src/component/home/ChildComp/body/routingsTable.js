import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Avatar} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import {BasicbuttonsStyles,BasictextColor} from '../../../colorplatte'
import {
  useGridApiRef,
  DataGridPro,
} from '@mui/x-data-grid-pro';

import {useSelector} from 'react-redux';

import Axios from 'axios';

export default function RoutingTable() {

  const apiRef = useGridApiRef();

  const PassangerID = useSelector((state)=>state.user.value.id); //used to add travel details to passanger when logged
  const type = useSelector((state)=>state.user.value.type);
  const isLogged = useSelector((state)=>state.user.value.loginstate);
  /*AddButton */
  /*Dialog Alerts  */
  const [Addopen, setAddOpen] = React.useState(false);
  const [NoRemainingSeatsopen, setNoRemainingSeatsopen] = React.useState(false);
  const [UnregisterAddopen, setUnregisterAddopen] = React.useState(false);

  const initialstate = {
    id:""
  } 
  const[TravelDetailID, setTravelDetailID] = useState(initialstate);
  
  
  const AddhandleClickOpen = (id) => async (event) => {
    const IsThereSeat = apiRef.current.getRow(id.id).NumberOfRemainingSeats>0;
    if ((isLogged) && (type=='Passanger') && (IsThereSeat)){
      event.stopPropagation();
      setAddOpen(true);
      setTravelDetailID(id) 
      console.log(apiRef.current.getRow(id.id).NumberOfRemainingSeats>0)
      
  } else if (!IsThereSeat){
    setNoRemainingSeatsopen(true)
  }else
  {
    setUnregisterAddopen(true)
  }     
  };
  
  const Agreehandle = () => {      
          if (TravelDetailID.id!=='') 
          {
            Axios.post("http://localhost:3001/api/bookingTravelDetails", { TravelDetailID:TravelDetailID.id,PassangerID:PassangerID }).then(() => {
                alert('successful insert');
            });
          }      
    setAddOpen(false);
  };

  
  const AddhandleClose = () => {
    setAddOpen(false);
  };

  const UnregisterAddhandleClose = () => {
    setUnregisterAddopen(false);
  };

  const NoRemainingSeatsClose = () => {
    setNoRemainingSeatsopen(false);
  };
                                              /*Dialog Alerts  */
  function AddButton(id) {
    return (
      < Button
        onClick={AddhandleClickOpen(id)}
        sx={BasicbuttonsStyles}
      >< AddIcon /></Button>);
  }
  /*AddeButton */

  /*User routing Table value getter */

   const [routingDetails, setroutingDetails] = useState([]);
   useEffect(() => {
       Axios.post("http://localhost:3001/api/routingDetails").then((response) => {
        setroutingDetails(response.data)
       })
   },[]);    
  const rows = routingDetails.map((val, index, array) => ({    
    id:val.id,
    type:val.type,
    date:val.date,
    from:val.From,
    To:val.To,
    phone:val.phone,
    gMapID:val.gMapID ,
    discription:val.discription,
    NumberOfRemainingSeats:val.numOfPassengers - val.NumberOfBookedpassanger
   }));

  const noSeatsRow = (params) => params.row.NumberOfRemainingSeats == 0 ? 'noSeats': 'B';
  const columns = [
    {
      field: 'Action',
      headerName: 'Action',
      width: 130,   
       renderCell: ({id}) => (
         <AddButton id={id}></AddButton>
      ), 
    },
    { field: 'avatar', headerName: 'Account', width: 130,renderCell: (params) => (
      <Link to='/DriverAcc'><Avatar alt="Remy Sharp" src={require('../../../UserAccount/DriverAccount/img/3340.jpg')}/></Link>
    ), },
    { field: 'id', cellClassName: (params) => noSeatsRow(params), headerName: 'id', width: 130 },    
    { field: 'type', cellClassName: (params) => noSeatsRow(params), headerName: 'Vehicle', width: 130 },
    { field: 'date', cellClassName: (params) => noSeatsRow(params), headerName: 'Date And Time', width: 250 },
    { field: 'from', cellClassName: (params) => noSeatsRow(params), headerName: 'From', width: 170 },
    {
      field: 'To',
      cellClassName: (params) => noSeatsRow(params),
      headerName: 'To',
      type: 'number',
      width: 170,
    },
    {
      field: 'phone',
      cellClassName: (params) => noSeatsRow(params),
      headerName: 'Phone',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    { field: 'gMapID',cellClassName: (params) => noSeatsRow(params), headerName: 'Google Map', width: 170 },
    {
      field: 'discription',
      cellClassName:(params) => noSeatsRow(params),
      headerName: 'Discription',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'NumberOfRemainingSeats',
      cellClassName: (params) => noSeatsRow(params),
      headerName: 'Number Of Remaining Seats',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable: true,
    }
  ];

  /*User routing Table */
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
          '& .noSeats': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#377334' : 'rgba(255,0,0,0.5)',
          },
        }}
      >        
        <h1>Travel Details</h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGridPro
            rows={rows}
            columns={columns}             
            apiRef={apiRef}
            componentsProps={{
              toolbar: { apiRef },
            }}
            pageSize={5}
            rowsPerPageOptions={[5]}  
               
          />
        </div>
        {/* AddeButton Diolog Box */}
        <Dialog
          open={Addopen}
          onClose={AddhandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={BasictextColor}>
              ABC
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={AddhandleClose}>Disagree</Button>
            <Button onClick={Agreehandle} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {/* AddeButton Diolog Box */}
        {/* AddeButton Diolog Box */}
        <Dialog
          open={UnregisterAddopen}
          onClose={AddhandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"OMG!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={BasictextColor}>
              Please register to passanger to add travels
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={UnregisterAddhandleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {/* AddeButton Diolog Box */}
        {/* AddeButton Diolog Box */}
        <Dialog
          open={NoRemainingSeatsopen}
          onClose={AddhandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"OMG!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={BasictextColor}>
            Total number of seats exceeded
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={NoRemainingSeatsClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {/* AddeButton Diolog Box */}
      </Box>
    </div>
  );
}
