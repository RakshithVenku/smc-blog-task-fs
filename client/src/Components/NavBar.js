import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import {AppBar, Button, Toolbar} from '@material-ui/core'
import { makeStyles} from "@material-ui/core/styles"
import ListIcon from '@material-ui/icons/List';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import swal from 'sweetalert'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import BlogComponent from './BlogComponent'

const useStyles = makeStyles((theme)=>({
    toolbarDiv : {
        margin : 'auto'
    },
    buttonUi : {
        color: 'white'
    }
}))

const NavBar = (props) => {
    const {userLoggedIn, handleAuth} = props
    const classes = useStyles()
    return (
        <div style={{marginTop: '40px'}}>
            <AppBar  position ="static">
                <Toolbar  className ={classes.toolbarDiv}>
            <div >
            <Button className ={classes.buttonUi} component={Link} to="/"><HomeSharpIcon/>Home</Button> | 
             {userLoggedIn ? (
                 <>
                     <Button className ={classes.buttonUi} component={Link} to="/blogData" ><ListIcon />Blog Data</Button> |  
                     <Button className ={classes.buttonUi} onClick={() => {
                         
                         swal({
                             title: "Are you sure?",
                             text: "this will logout from your page!",
                             icon: "warning",
                             buttons: true,
                             dangerMode: true,
                           })
                           .then((isLoggedOut) => {
                               if(isLoggedOut){
                                 localStorage.removeItem('token')

                                 swal("successfully logged out", {
                                     icon: "success",
                                   })
                                 handleAuth()
                                 props.history.push('/')
                               }
                           })
                      }}><ExitToAppSharpIcon/>Logout</Button>  
                </>
             ) : ( 
                 <>
                     <Button className ={classes.buttonUi} component={Link} to="/register"><PersonAddSharpIcon/>Register</Button> |
                     <Button className ={classes.buttonUi} component={Link} to="/login"><LockOpenSharpIcon/>Login</Button>
                 </>   
             )}
            </div>
            </Toolbar>
            </AppBar>
     
            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} />
            <Route path="/login" render={(props) => {
                return <Login
                          {...props}
                          handleAuth={handleAuth}
                       />
            }} />
            {localStorage.getItem('token') && <Route path="/blogData" component={BlogComponent} />}
            
        </div>
    )
}

const WrappedComponent = withRouter(NavBar)

export default WrappedComponent



