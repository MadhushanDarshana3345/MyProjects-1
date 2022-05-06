import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {useSelector} from 'react-redux';


import {
  useGridApiRef,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';


import Axios from 'axios';

function EditToolbar(props) {
  const { apiRef } = props;
  //traveldetailsID
  const [ID, setID] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/traveldetailsIDCalculate").then((response) => {
      setID(response.data)
    })
  }, []);

  const handleClick = () => {
    const id = ID.map((val) => (val.id + 1));
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, 'edit');
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });

      apiRef.current.setCellFocus(id, 'name');
    });
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
};


export default function RoutingTimeTable() {  
  const driverID = useSelector((state)=>state.user.value.id);

  const [travelDetails, settravelDetails] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/TravelDetails",{driverID:driverID}).then((response) => {
      settravelDetails(response.data)
    })
  }, []);
  
  const rows = travelDetails.map((val,index) => ({
    id: val.id,
    Vehicle: val.type,
    From: val.From,
    To: val.To,
    DateAndTime: val.date,
    Discription: val.discription,
    gMapID: val.gMapID,
    NumberOfBooking:val.NumberOfBookedpassanger,
    NumberOfRemainingSeats:val.numOfPassengers - val.NumberOfBookedpassanger
  }));


  const apiRef = useGridApiRef();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellFocusOut = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'edit');
  };

  const intialValues = {
    id: "",
    Vehicle: "",
    From: "",
    To: "",
    DateAndTime: "",
    Discription: "",
    gMapID: "",
  }
  const [updatetraveldetails, setupdatetraveldetails] = useState(intialValues);

  const handleSaveClick = (id) => async (event) => {
    event.stopPropagation();
    // Wait for the validation to run
    const isValid = await apiRef.current.commitRowChange(id);
    if (isValid) {
      apiRef.current.setRowMode(id, 'view');
      const row = apiRef.current.getRow(id);
      apiRef.current.updateRows([{ ...row, isNew: false }]);
    }
    setupdatetraveldetails(apiRef.current.getRow(id))
  };


  useEffect(() => {
    if (updatetraveldetails.id !== '') {     
      Axios.post("http://localhost:3001/api/insertupdatetraveldetails", { ID:updatetraveldetails.id ,From: updatetraveldetails.From, To: updatetraveldetails.To, DateAndTime: new Date(updatetraveldetails.DateAndTime).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }), Discription: updatetraveldetails.Discription, gMapID: updatetraveldetails.gMapID });
      Axios.post("http://localhost:3001/api/UpdateVehicleTravelDetails", { vehicleID:updatetraveldetails.Vehicle,ID:updatetraveldetails.id }).then(() => {
        alert('successful insert');
      });
    }
  });

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    Axios.post("http://localhost:3001/api/deletedrivertraveldetails", { travelID: id, driverID:driverID}).then(() => {
            alert('successful insert');
    });
    apiRef.current.updateRows([{ id, _action: 'delete' }]);
  };

  const handleCancelClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    if (row.isNew) {
      apiRef.current.updateRows([{ id, _action: 'delete' }]);
    }
  };

  const [selectvahicleDetails, setselectvahicleDetails] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/selectvahicle",{driverID:driverID}).then((response) => {
      setselectvahicleDetails(response.data);
    })
  }, []);

  const columns = [
    { field: 'id', headerName: 'Travel ID', width: 130 },
    {
      field: 'Vehicle',
      headerName: 'Vehicle',
      width: 130,
      type: 'singleSelect',
      valueOptions: selectvahicleDetails.map((val, index) => ({ value: val.id, label: val.type })),
      editable: true
    },
    { field: 'From', headerName: 'From', width: 170, editable: true },
    {
      field: 'To',
      headerName: 'To',
      type: 'String',
      width: 170,
      editable: true,
    },
    {
      field: 'DateAndTime',
      headerName: 'Date And Time',
      type: 'dateTime',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      editable: true,
    },
    {
      field: 'Discription',
      headerName: 'Discription',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: 'gMapID',
      headerName: 'Google Map ID',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 250,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },      
    },
    {
      field: 'NumberOfBooking',
      headerName: 'Number Of Booking',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
    },
    {
      field: 'NumberOfRemainingSeats',
      headerName: 'Number Of Remaining Seats',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
    }
    
  ];

  return (
    <div>
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
        <h1>Time Table</h1>
        <DataGridPro
          rows={rows}
          columns={columns}
          apiRef={apiRef}
          editMode="row"
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          onCellFocusOut={handleCellFocusOut}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { apiRef },
          }}
        />
      </Box>
    </div>
  );
}