import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {

    const navigate = useNavigate();

    const [user , setUser]= useState({
        email : '',
        password : ''
    })

    const [errors , setErrors ] = useState({
        email : '',
        password : ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login' , user , {withCredentials : true})
            .then(res => {console.log(res) ; navigate(`/main/${user.email}`); localStorage.setItem('userID' , res.data.user._id)})
            .catch(err => {console.log(err.response) ; err.response.data =='Email does not exist' ? setErrors({email : err.response.data}) : setErrors({ password : err.response.data}) })
    }


    const defaultTheme = createTheme();

    return(
        <>
        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://ideascale.com/wp-content/uploads/2022/03/Task-Management-Advantages-scaled.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'dodgerblue' }}>
                <LoginIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                
                {errors.email ?
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                error
                label={errors.email}
                name="email"
                autoComplete="email"
                autoFocus
                value={user.email}
                onChange={(e) => setUser({...user , email : e.target.value})}
                />
                :
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={user.email}
                    onChange={(e) => setUser({...user , email : e.target.value})}
                />
                }
                {errors.password ? 
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                error
                label={errors.password}
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={(e) => setUser({...user , password : e.target.value})}
                />
                :
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={user.password}
                    onChange={(e) => setUser({...user , password : e.target.value})}
                />
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item >
                    <Link href="/" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Grid>
        </Grid>
        </ThemeProvider>
        </>
    )
}

export default LogIn