import * as React from 'react';
import { styled, ListItemText, ListItemIcon, ListItem, Divider, Drawer, List, alpha, AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, useTheme, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CircleIcon from '@mui/icons-material/Circle';
import MailIcon from '@mui/icons-material/Mail';
import EmailIcon from '@mui/icons-material/Email';
import MoreIcon from '@mui/icons-material/MoreVert';

/*Sidebar Menu Icon */
import HomeIcon from '@mui/icons-material/Home';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RouteIcon from '@mui/icons-material/Route';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import InfoIcon from '@mui/icons-material/Info';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
/*Sidebar Menu Icon */

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useNavigate, Link } from "react-router-dom";

import { Booking } from '../../../redux/action/index';
import { login } from '../../../redux/action/index';
import { useSelector, useDispatch } from 'react-redux';


/*Main app bar */
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },

    },
}));


export default function Header() {
    const dispatch = useDispatch();
    const isLogged = useSelector((state)=>state.user.value.loginstate);
    const usertype = useSelector((state)=>state.user.value.type);

    const numberOfBooking = useSelector((state)=>state.travelDetails.value.numberOfBooking);
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleLogOut = () => {
        dispatch(Booking({numberOfBooking:0}));
        dispatch(login({ loginstate: false }));
        //setAnchorEl(event.currentTarget);

    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    let Navigate = useNavigate();
    const myAccount = () => {
        Navigate('/DriverAcc');
        handleMenuClose();
    }
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={myAccount}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new Messages"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <EmailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem onClick={handleLogOut}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    /*Main app bar */

    /*handle left drawer open & close */
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));
    const drawerWidth = 240;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    /*handle left drawer open & close */ 


    const iconColor = {
        color:'#f1b24b'
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: '#f1b24b' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        One Way
                    </Typography>
                    {isLogged?<Button sx={{color:'black', background:'white', margin:1, '&:hover':{background: "white"}}}><CircleIcon sx={{ fontSize: 20,marginRight:1 }}/> {usertype} </Button>:<Button variant="contained" color="error" sx={{ margin:1 }}> <CircleIcon sx={{ fontSize: 20 }}/> LogOut User</Button>}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new bookings" color="inherit">
                            <Badge badgeContent={numberOfBooking} color="error">
                                <MenuBookIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new Messages"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <EmailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleLogOut}
                            color="inherit"
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon sx={iconColor}/> : <ChevronRightIcon sx={iconColor}/>}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Home', 'Become a Member', 'Become a driver', 'My booking', 'Today routings'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={{                                                                           /*Display Sidebar menu icon using switch case */
                            'Home': '/',
                            'Become a Member': '/PassangerAcc',
                            'Become a driver': '/DriverAcc',
                            'My booking': '/',
                            'Today routings': ''
                        }[text]}>
                            <ListItemIcon>
                                {{                                                                           /*Display Sidebar menu icon using switch case */
                                    'Home': <HomeIcon sx={iconColor}/>,
                                    'Become a Member': <AccountBoxIcon sx={iconColor}/>,
                                    'Become a driver': <DriveEtaIcon sx={iconColor}/>,
                                    'My booking': <MenuBookIcon sx={iconColor}/>,
                                    'Today routings': <RouteIcon sx={iconColor}/>
                                }[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Contact', 'About us'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {{                                                                              /*Sidebar menu icon using switch case */
                                    'Contact': <PermContactCalendarIcon sx={iconColor}/>,
                                    'About us': <InfoIcon sx={iconColor}/>
                                }[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
