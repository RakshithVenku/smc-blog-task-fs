import React, { useState, useEffect } from 'react'
import {Container, Paper} from '@material-ui/core'
import NavBar from './Components/NavBar'

const App = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      handleAuth()
    }
  }, [])

  return (
    <Container component="main" >
      <Paper elevation={8}>
        <div style={{minHeight: "580px"}}>
        <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
        </div>
        </Paper>
    </Container>
  )
}

export default App
