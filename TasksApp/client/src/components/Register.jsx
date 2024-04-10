import React, { useState } from "react";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [user , setUser] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        confirm : ''
    })

    const [errors , setErrors] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        confirm : ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        axios.post('http://localhost:8000/api/register' , user , {withCredentials : true})
            .then(res => {console.log(res) ; navigate(`/main/${user.email}`) ; localStorage.setItem('userID' , res.data.user._id)})
            .catch(err =>{ console.log(err); err.response.data.errors ? setErrors(err.response.data.errors) : ''})
    }

    const defaultTheme = createTheme();

    return(
        <>
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AppRegistrationIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    {errors.firstName ?
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    error
                    label={errors.firstName.message}
                    autoFocus
                    value={user.firstName}
                    onChange={(e) => setUser({...user , firstName : e.target.value})}
                    />
                    :
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={user.firstName}
                    onChange={(e) => setUser({...user , firstName : e.target.value})}
                    />
                    }   
                </Grid>
                <Grid item xs={12} sm={6}>
                    {errors.lastName ?
                    <TextField
                    error
                    required
                    fullWidth
                    id="lastName"
                    label={errors.lastName.message}
                    name="lastName"
                    autoComplete="family-name"
                    value={user.lastName}
                    onChange={(e) => setUser({...user , lastName : e.target.value})}
                    />
                    :
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label={'Last Name'}
                    name="lastName"
                    autoComplete="family-name"
                    value={user.lastName}
                    onChange={(e) => setUser({...user , lastName : e.target.value})}
                    />
                    }
                </Grid>
                <Grid item xs={12}>
                    {errors.email ? 
                    <TextField
                    required
                    fullWidth
                    id="email"
                    error
                    label={errors.email.message}
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={(e) => setUser({...user , email : e.target.value})}
                    />
                    :
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={(e) => setUser({...user , email : e.target.value})}
                    />
                    }
                </Grid>
                <Grid item xs={12}>
                    {errors.password ?
                    <TextField
                    required
                    fullWidth
                    name="password"
                    error
                    label={errors.password.message}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={user.password}
                    onChange={(e) => setUser({...user , password : e.target.value})}
                    />
                    :
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={user.password}
                    onChange={(e) => setUser({...user , password : e.target.value})}
                    />
                    }
                </Grid>
                <Grid item xs={12}>
                    {errors.confirm ?
                    <TextField
                    required
                    fullWidth
                    name="Confirm Password"
                    error
                    label={errors.confirm.message}
                    type="password"
                    id="confirmPass"
                    autoComplete="new-password"
                    value={user.confirmPass}
                    onChange={(e) => setUser({...user , confirm : e.target.value})}
                    />
                    :
                    <TextField
                    required
                    fullWidth
                    name="Confirm Password"
                    label="Confirm Password"
                    type="password"
                    id="confirmPass"
                    autoComplete="new-password"
                    value={user.confirmPass}
                    onChange={(e) => setUser({...user , confirm : e.target.value})}
                    />
                    }
                </Grid>
                
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="login" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container> 
        </ThemeProvider>
        </>
    )
}

export default Register