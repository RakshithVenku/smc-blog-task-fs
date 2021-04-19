import React, { useState } from 'react'
import swal from 'sweetalert'
import axios from 'axios'
import validator from 'validator'
import {TextField, Container, Link, Button, Grid, Typography , Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      left : '44%'
    }
  }));


const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const classes = useStyles();


    const runValidations = () => {
        //name
        if(username.trim().length === 0){
            errors.username = 'username cannot be blank'
        }

        //password
        if(password.trim().length === 0){
            errors.password = 'password cannot be blank'
        }

        //email
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors.email = 'invalid email format'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                username : username,
                email : email,
                password : password
            }
    
            axios.post('https://dct-user-auth.herokuapp.com/users/register', formData)
                 .then((response) => {
                     const result = response.data
                     if(result.hasOwnProperty('errors')){
                         swal({title : result.message ,icon : 'error'})
                     }else {
                         swal({title : 'successfully created an account',icon : 'success'})
                         props.history.push('/login')
                     }
                 })
                 .catch((err) => {
                     alert(err.message)
                 })
                 
        }else{
            setFormErrors(errors)
        }

        
    }

    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value)
        } else if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    return (
        <Container component="main" maxWidth="sm" align="center">
        <div>
            <Avatar  className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Register with us</Typography>

            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                 <Grid item xs={12}>
                   <TextField fullWidth variant="outlined"  type="text" label="enter username" value={username} onChange={handleChange} name="username" />
                   { formErrors.username && <Typography style={{color : 'red'}}> {formErrors.username} </Typography> }
                 </Grid>

                 <Grid item xs={12}>  
                   <TextField fullWidth variant="outlined"  type="text" label="enter email" value={email} onChange={handleChange} name="email" />
                   { formErrors.email && <Typography style={{color : 'red'}}> {formErrors.email} </Typography> }
                 </Grid>
                   
                 
                 <Grid item xs={12}>
                   <TextField fullWidth variant="outlined"  type="password" label="enter password" value={password} onChange={handleChange} name="password" />
                   { formErrors.password && <Typography style={{color : 'red'}}> {formErrors.password} </Typography> }
                 </Grid>

                 <Grid item xs={12} >
                      <Button  type="submit" variant="contained" color="primary"> Sign Up </Button>
                 </Grid>

                </Grid>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
            </form>
        </div>
        </Container>
    )
}

export default Register