import React from 'react';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Accordion, AccordionDetails, AccordionSummary, Typography, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';

import {useSelector} from 'react-redux';

import Axios from 'axios';


export default function Comments() {
    const driverID = useSelector((state)=>state.user.value.id);
    const type = useSelector((state)=>state.user.value.type);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [comments, setcomments] = useState([]);
    useEffect(() => {
        Axios.post("http://localhost:3001/api/selectcomments",{driverID:driverID}).then((response) => {
            setcomments(response.data)
        })
    }, []);
    return (
        <div>
            <Box
                sx={{
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
    
    {comments.map((val, key) => {
        return (
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            <Avatar alt="Remy Sharp" src={require('../img/3340.jpg')} />
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{val.name} : {val.Comments}</Typography>
                    </AccordionSummary>
                </Accordion>
                );})}
                
                {type=='driver' ?(<Button sx={{ margin: 2 }} variant="outlined" onClick={handleClickOpen}>Comment</Button>):(<div></div>) }

                
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Send feedback to driver</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            give great feedback and play an active part with the service
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Feedback"
                            label="Feedback"
                            type="textbox"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    )
}
