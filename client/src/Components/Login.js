import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import validator from 'validator'
import {TextField, Container, Link, Button, Grid, Typography, Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      left : '44%'
    }
  }));

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    
    const classes = useStyles();

    const runValidations = () => {
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
                email : email,
                password : password
            }
    
            //if validations pass
    
            axios.post('https://dct-user-auth.herokuapp.com/users/login', formData)
                 .then((response) => {
                     const result = response.data
                     if(result.hasOwnProperty('errors')){
                         swal({title : result.errors ,icon :'error'})
                     }else{
                         swal({title :'successfully logged in',icon :'success'})
                         localStorage.setItem('token', result.token)
                         props.history.push('/')
                         props.handleAuth()
                     }
                 })
                 .catch((err) => {
                     console.log(err.message)
                 })
        }else {
            setFormErrors(errors)
        }
    }
    
    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    return (
        <Container component="main" maxWidth="sm" style={{textAlign : "center"}}>
           <div>
               <Avatar  className={classes.avatar}>
                 <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">Login</Typography>
               <form onSubmit={handleSubmit}>

               <Grid item xs={12}>
                   <TextField  variant="outlined" type="text" style={{marginBottom : '10px'}} placeholder="enter email" value={email} onChange={handleChange} name="email" />
                   { formErrors.email && <Typography style={{color : 'red'}}> {formErrors.email} </Typography> }
               </Grid>
   
               <Grid item xs={12}>
                   <TextField  variant="outlined" type="password" style={{marginBottom : '10px'}} placeholder="enter password" value={password} onChange={handleChange} name="password" />
                   { formErrors.password && <Typography style={{color : 'red'}}> {formErrors.password} </Typography> }
               </Grid>
   
               <Grid item xs={12}>
                   <Button type="submit" variant="contained" color="primary"> Sign in </Button>
              </Grid>

              <Grid container justify="flex-end">
                   <Grid item>
                     <Link href="/register" variant="body2">
                       Don't have an account? Sign up
                     </Link>
                   </Grid>
              </Grid>
               </form>
           </div>
        </Container>
    )
}

export default Login