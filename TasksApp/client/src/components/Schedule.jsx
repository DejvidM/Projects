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
import { Box, ButtonGroup, Table } from "@mui/material";
import TextField from "@mui/material/TextField";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';




const Schedule = () => {
    const {email} = useParams()
    const navigate = useNavigate();
    const [authorized , setAuthorized] = useState('');
    const [ dayAgenda , setDayAgenda] = useState({
        date : '',
        creator : localStorage.getItem('user')
    })
    const [plan , setPlan] = useState('');
    const [plans , setPlans] = useState([]);
    const [state , setState ] = useState(-1);
    const [errors , setErrors] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/users' , {withCredentials : true})
            .then(res =>{ setAuthorized(true)})
            .catch(err => {console.log(err)})
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dayAgenda.date)
        console.log(plans)
        axios.post('http://localhost:8000/api/createSchedule' , {creator : localStorage.getItem('user') , date : dayAgenda.date , plans : plans} , {withCredentials : true})
            .then(res => {console.log(res) ; navigate(`/main/${email}`)})
            .catch(err => setErrors('The table cannot be empty! Cancel to go back.'))
    }
    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const arrofTime = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

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
                style={{textDecoration : 'none', marginRight : '15px' , display : 'flex' , alignItems : 'center' , fontFamily : 'Andale Mono, monospace' , fontWeight : '600'}}
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
        <div className="anotherpic">
        <Container sx={{height : '86vh' ,margin : '0px'}} >
            <h1 style={{marginLeft: "460px"}}
            className="newEffect"
            >Here you can make your agenda</h1>
            <Box sx={{ width :'100%' ,margin : '0px auto'}} >
                <form style={{display : "flex" , flexDirection : 'row', width : '100%',justifyContent : 'space-between' , alignItems : 'center' , padding : '20px'}}
                className="form"
                onSubmit={handleSubmit}
                >
                    <label style={{marginBottom :'5px' , fontSize : '1.8em' ,fontFamily : 'monospace' , marginRight : '10px'}}>Date</label>
                    <TextField  id="outlined-basic" variant="outlined" style={{marginBottom :'1px', marginRight : '100px', width :'300px'}} value={dayAgenda.date} onChange={(e) => setDayAgenda({...dayAgenda , date : e.target.value })}/>
                    <TableContainer sx={{maxHeight : 480}} style={{ padding : '10px' , borderRadius : '10px'}}>
                            <Table sx={{maxHeight : 480}} size="small">
                                <TableHead>
                                    <TableRow style={{display : 'flex' , justifyContent : 'space-between' , width : '500px' ,alignItems : 'center' }}>
                                        <TableCell style={{fontSize : '1.9em' , fontFamily : 'monospace' ,width : '100vh', padding : '10px'}}>Time</TableCell> 
                                        <TableCell style={{fontSize : '1.9em' , fontFamily : 'monospace' , padding : '10px'}}>Plans</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arrofTime.map( (item,index) => 
                                        <TableRow key={index} style={{display : 'flex' , justifyContent : 'space-between' , width : '578px' , alignItems : 'center'}}>
                                            <TableCell style={{fontSize : '1.76em' , fontFamily : 'monospace', width: '50vh', padding : '10px' }}>{item}:00</TableCell>
                                            <TableCell style={{padding : '6.35px', display : 'flex'}}>
                                                {state == index?
                                                <>
                                                <TextField 
                                                onChange={(e) => setPlan(e.target.value)}
                                                id="outlined-basic" variant="outlined" size="small" style={{width : '300px',fontFamily : 'monospace'}} 
                                                onClick={() => {setState(index)}}
                                                />
                                                <Button onClick={() => {plan ? (setPlans([...plans , {name : plan , time : item}]) , setPlan('') , setState(-1)) : (setState(-1)) }}>Finish</Button>
                                                </>
                                                : state >= 0
                                                ?
                                                <TextField 
                                                disabled
                                                onChange={(e) => setPlan(e.target.value)}
                                                id="outlined-basic" variant="outlined" size="small" style={{width : '300px',fontFamily : 'monospace'}} 
                                                onClick={() => {setState(index) ; console.log(index)}} />
                                                : <TextField 
                                                onChange={(e) => setPlan(e.target.value)}
                                                id="outlined-basic" variant="outlined" size="small" style={{width : '300px',fontFamily : 'monospace'}} 
                                                onClick={() => {setState(index) ; console.log(index)}} />}
                                            </TableCell>
                                        </TableRow>
                                    )}           
                                </TableBody>
                            </Table>
                    </TableContainer>
                    <ButtonGroup variant="contained" style={{marginRight : '-160px', marginLeft: "30px"}}>
                        <Button size="large" color="error" onClick={() => navigate(-1)}>Cancel</Button>
                        <Button size="large" color="secondary" type='submit'>Create</Button>
                    </ButtonGroup>
                </form>            
            </Box>
        </Container>
        </div>
        {errors ?
        <div className="popover">
            {errors}
        </div>
        : <div className="hidden" >
        {errors}
        </div>
        }
        </>
    )
}

export default Schedule;