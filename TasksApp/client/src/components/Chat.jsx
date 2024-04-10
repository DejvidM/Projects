import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import Skeleton from "@mui/material/Skeleton";

const Chat = () => {
    const {email} = useParams()
    const navigate = useNavigate();
    const [authorized , setAuthorized] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/users' , {withCredentials : true})
            .then(res =>{ setAuthorized(true)})
            .catch(err => {console.log(err)})
    },[])

    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
        {!authorized
        ? <Skeleton variant="rectangular" width={1600} height={800} />
        :
        <>
            <Container sx={{ height : '11vh' , display : 'flex' , alignItems : 'center' , justifyContent : 'space-between'}}
            style={{background : 'linear-gradient(180deg , #607d8b , #c9c9c9, transparent 170% )', borderBottom : '2px solid darkgray'}} 
            maxWidth='xl'>
            <Breadcrumbs sx={{fontSize : '1.4em' }} elevation='8' >
                <Link 
                style={{textDecoration : 'none' , marginRight : '15px' , display : 'flex' , alignItems : 'center' , fontFamily : 'Andale Mono, monospace' , fontWeight : '600'}}
                to={`/main/${email}`}
                className="effect"
                >
                <HomeIcon sx={{ mr: 0.8 , marginBottom : '2px', color : '#2c3968'}} />
                Home
                </Link>
                <Link
                style={{textDecoration : 'none', marginRight : '15px' , marginLeft : '15px' ,display : 'flex' , alignItems : 'center' , fontFamily : 'Andale Mono, monospace' , fontWeight : '600'}}
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                to={`/chat/${email}`}
                className="effect"
                >
                <ChatIcon sx={{ mr: 0.8 , marginBottom : '2px', color : '#2c3968'}} />
                Chat With Friends
                </Link>
                <Link
                style={{textDecoration : 'none' , marginRight : '15px', marginLeft : '15px' ,display : 'flex' , alignItems : 'center' , fontFamily : 'Andale Mono, monospace' , fontWeight : '600'}}
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
                to={`/makeSchedule/${email}`}
                className="effect"
                >
                <EditCalendarIcon sx={{ mr: 0.8 , marginBottom : '2px', color : '#2c3968'}}/>
                Make a Schedule
                </Link>
            </Breadcrumbs>

            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 52, height: 52 }} style={{background : 'linear-gradient(60deg , #002244 , #4E0707)' , }}></Avatar>
                </IconButton>
                </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 26,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate('/editProfile')}>
                <Avatar /> Edit Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={()=> {axios.get('http://localhost:8000/api/logout' , {withCredentials : true})
                                            .then(res => {console.log(res) ; navigate('/login')})
                                            .catch(err => console.log(err))
                                            }}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
                </MenuItem>
            </Menu>
            </Container> 
        </>
        }
        </>
    )
}

export default Chat;