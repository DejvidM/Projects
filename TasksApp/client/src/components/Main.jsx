import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import ChatIcon from '@mui/icons-material/Chat';
import Skeleton from "@mui/material/Skeleton";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import Pagination from '@mui/material/Pagination';

const Main = () => {
    const {email} = useParams();
    const navigate = useNavigate();
    const [authorized , setAuthorized] = useState('');
    const [user , setUser] = useState({
        firstName : '',
        lastName : '',
        email :'',
        password : '',
        createdAt : '',
        agenda : [{}]
    });   
    const [plansAgain , setPlans] = useState({
        date : new Date().toISOString().slice(0,10) ,
        plans : [{
            name : '',
            time : ''
        }]
    });
    const [allUsers , setAllUsers] = useState([]);
    const [page , setPage] = useState(1);
    const [date, setDate] = useState(new Date().toISOString().slice(0,10)); 
    const [ usingDates , setUsingDates] = useState(new Date().getDate());
    const [ day , setDay] = useState(new Date().getDay())
    const today = new Date().getDay()
    const days = ['Sunday','Monday', 'Tuesday' , 'Wednesday', 'Thursday ' , 'Friday' , 'Saturday', 'Sunday','Monday', 'Tuesday' , 'Wednesday', 'Thursday ' , 'Friday' , 'Saturday' ];
    const [month , setMonth] = useState(new Date().getMonth());
    const months = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December']
    const [year , setYear] = useState(new Date().getFullYear());
    const [time , setTime] = useState(new Date().getHours());
    const arrofTime = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    const [edit , setEdit] = useState('');

    useEffect(() => {
        setPlans({
            date : new Date().toISOString().slice(0,10) ,
            plans : [{
                name : '',
                time : ''
            }]
        })
        axios.get('http://localhost:8000/api/users' , {withCredentials : true})
            .then(res =>{ setAuthorized(true) ;setAllUsers(res.data)})
            .catch(err => {console.log(err)})
        axios.get(`http://localhost:8000/api/oneUser/${email}`, {withCredentials : true})
            .then(res => { setUser(res.data) ; localStorage.setItem('user' , res.data._id) ;     
                        res.data.agenda.map(plan => {  
                        axios.get(`http://localhost:8000/api/oneschedule/${plan}` ,{withCredentials : true})
                            .then(  res => { res.data.date.slice(0,10) == (usingDates > 10 ? `${year}-0${month + 1}-${usingDates}` : `${year}-0${month + 1}-0${usingDates}`) ? (setPlans( res.data )) : ''})
                            .catch(err => console.log(err)) }
                            )
                })
            .catch(err => console.log(err))        
    },[usingDates])
    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
        })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        }));
    const [removeInfo , setRemoveInfo] = useState('');
    const handlePagination = (e,value) => {
        page < value
        ?
        setUsingDates(usingDates + value - page)
        : value == 1
        ? setUsingDates(new Date().getDate())
        : setUsingDates(usingDates - (page - value) )
        setPage(value);
        setDay(value + today - 1)
        }
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
                sx={{ display: 'flex', alignItems: 'center' , color : '#2c3968' }}
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

            <ThemeProvider theme={darkTheme}>
            <Container sx={{height : '89vh', paddingInline : '30px'}}
            className="pic" 
            maxWidth='xl'></Container>
            <Container sx={{height : '89vh', paddingInline : '30px'}}
            maxWidth='xl'
            style={{position : "absolute" , top : '70px'}}>
                <Grid container className="animation" >
                    {removeInfo ? 
                        <Grid item xs={3} style={{margin : '40px 30px 0px 40px'}}>
                        <Card style={{borderRadius : '20px', backgroundColor : 'transparent' , color : 'black'}}>
                            <CardHeader
                                avatar={
                                    
                                <Avatar sx={{ bgcolor: 'darkgray' }} aria-label="recipe" >
                                </Avatar>
                                }
                                title = <>{user.firstName} {user.lastName}</>
                            />
                            <CardContent>
                                <Typography variant="body2" color="black">
                                    Notifications - You have 0 notifications :(
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Typography variant="body3" color="black" >
                                    Things to remember while using the application
                                </Typography>
                                <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                <Typography color='black'>
                                    Rule 1 - 
                                </Typography>
                                <Typography paragraph >
                                    Be respectful to other people.
                                </Typography>
                                <Typography color='black'>
                                    Rule 2 -
                                </Typography>
                                <Typography paragraph >
                                    Dont joke around with your schedule.(Plan things ,they are important)
                                </Typography>
                                <Typography color='black'>
                                    Rule 3 -
                                </Typography>
                                <Typography paragraph >
                                    Have Fun :)
                                </Typography>
                                </CardContent>
                            </Collapse>
                            </Card>
                        </Grid>
                    :
                    <Grid item xs={3} style={{margin : '40px 30px 0px 40px', borderRadius :'20px'}}>
                    <Card style={{borderRadius : '20px'}}>
                        <CardHeader
                        
                            avatar={
                                
                            <Avatar sx={{ bgcolor: 'darkgray' }} aria-label="recipe" >
                            </Avatar>
                            }
                            title ={ <>{user.firstName} {user.lastName}</> }
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            Information about the Website.<br />
                            You can make your schedule and keep track of it for as long as you want while making new friends and planning things together.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Typography variant="body3" color="text.primary" >
                                Things to remember before using the application
                            </Typography>
                            <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography color='primary'>
                                Rule 1 - 
                            </Typography>
                            <Typography paragraph >
                                Be respectful to other people.
                            </Typography>
                            <Typography color='primary'>
                                Rule 2 -
                            </Typography>
                            <Typography paragraph >
                                Dont joke around with your schedule.(Plan things ,they are important)
                            </Typography>
                            <Typography color='primary'>
                                Rule 3 -
                            </Typography>
                            <Typography paragraph >
                                Have Fun :)
                            </Typography>
                            </CardContent>
                        </Collapse>
                        </Card>
                    </Grid>
                    }
                    <Grid item xs={5} sx={{minHeight : 600 }}
                    style={{marginTop : '40px' , borderRadius : '20px', border : '1px solid darkslategray'}}
                    > 
                    <Container>
                        {page == 1 ? 
                        <><p className="pretty">{days[day]}, {months[month]} {usingDates} {year}</p>
                        <TableContainer sx={{maxHeight : 400}}>
                            <Table sx={{maxHeight : 400}}>
                                <TableHead>
                                <TableRow>
                                    <TableCell style={{color : "black"}}>Time</TableCell> 
                                    <TableCell  style={{color : "black"}}>Plans</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {plansAgain.date == `${year}-0${month+1}-${usingDates}` 
                                ?  arrofTime.map((item , index) => item > time ? <TableRow key={index}>
                                        <TableCell  style={{color : "black"}}>{item} : 00</TableCell>                                         
                                        <TableCell style={{color : "white"}}>{plansAgain.plans.map( anotherItem => anotherItem.time == item ? anotherItem.name  : '')}
                                    </TableCell>                            
                                    </TableRow>                            
                                    : '' )
                                : arrofTime.map((item , index) => item > time ? 
                                    <TableRow key={index}>
                                        <TableCell style={{color : 'black'}}>{item} : 00</TableCell>                                         
                                        <TableCell style={{color : "white"}}>
                                        </TableCell>                            
                                    </TableRow>
                                    : '' )
                                }   
                                </TableBody>
                            </Table>
                            </TableContainer>
                            </>
                        :
                        <><p className="pretty">{days[day]}, {months[month]} {usingDates} {year}</p>
                        <TableContainer sx={{maxHeight : 400}}>
                            <Table sx={{maxHeight : 400}} >
                                <TableHead>
                                <TableRow>
                                    <TableCell  style={{color : "black"}}>Time</TableCell> 
                                    <TableCell  style={{color : "black"}}>Plans</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {plansAgain.date.slice(0,10) == usingDates > 10 ?`${year}-0${month+1}-${usingDates}` :`${year}-0${month+1}-0${usingDates}`
                                ?  arrofTime.map((item , index) => <TableRow key={index}>
                                        <TableCell  style={{color : "black"}}>{item} : 00</TableCell>                                         
                                        <TableCell style={{color : "white"}}>{plansAgain.plans.map( anotherItem => anotherItem.time == item ? anotherItem.name  : '')}
                                    </TableCell>                            
                                    </TableRow>                            
                                )
                                : arrofTime.map((item , index) => 
                                    <TableRow key={index}>
                                        <TableCell  style={{color : "black"}}>{item} : 00</TableCell>                                         
                                        <TableCell style={{color : "white"}}>
                                        </TableCell>                            
                                    </TableRow>
                                )
                                }
                                </TableBody>
                            </Table>
                        </TableContainer></> 
                    }
                        
                            <Pagination count={7} variant="outlined" shape="rounded" style={{position : 'absolute' , bottom : '50px' , left : '573px'  , padding : '10px 20px' , borderRadius : '13px' , border : '2px solid #8f9f9f'}} page={page} onChange={handlePagination}/>
                    </Container>
                    
                    </Grid>
                    <Grid item xs={2.6} sx={{ maxHeight : 400}}
                    style={{margin : '40px 40px 0px 40px' , borderRadius : '20px', padding :'40px' , paddingTop : '4px' , color : 'black' }}
                    >
                    <h2>Recently registered</h2>
                    <div style={{display : 'flex' , flexDirection : 'column-reverse' , overflow : 'auto' , maxHeight : '400px'}}>
                        {allUsers ? 
                        allUsers.map((user) => 
                                <p key={user._id}>{user.firstName} {user.lastName}</p>
                            )
                            : <Skeleton variant="rectangular" width={260} height={400}></Skeleton>}
                    </div>
                    </Grid>
                </Grid>
                {removeInfo ? 
                    ''
                :
                <Tooltip title='Clear'>
                <ClearIcon style={{position : 'relative', left : '369px', bottom : '594px'}}
                className="animation"
                onClick={() => setRemoveInfo(true)}></ClearIcon>
                </Tooltip>
                }
            </Container>
            </ThemeProvider>
        </> 
        }
    </>
)
    }
export default Main;