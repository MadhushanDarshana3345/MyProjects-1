import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import {useSelector} from 'react-redux';
const columns = [
  { field: 'vehicleName', headerName: 'Vehicle Name', width: 70, color:'red' },
  { field: 'travelid', headerName: 'Travel ID', width: 70 },
  { field: 'Route', headerName: 'Route', width: 180 },
  { field: 'Name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'address',
    headerName: 'Home Address',
    width: 180,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
  },
];


export default function DataTable() {
  const driverID = useSelector((state)=>state.user.value.id);
  const [BookersDetails, setBookersDetails] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/SelectBookers",{driverID:driverID}).then((response) => {
      setBookersDetails(response.data);
    })
  }, []);
  const rows = BookersDetails.map((val,index)=>({   
    id: index,
    vehicleName:val.type,
    travelid:val.id,
    Route:val.from+' To '+val.to,
    Name:val.Name,
    email:val.email,
    address:val.address,
    phone:val.phone
  }));
  return (
    <Box
      sx={{
        display: 'flex',
        height: 500,
        flexDirection: 'column',
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
        overflow: 'hidden'
      }}
    >
      <h1>Bookers</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
}
