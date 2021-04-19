const express  = require('express')
const path = require('path') 
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


const mongoose = require('mongoose')

const AuthRoute = require('./routes/auth')

const CONNECTION_URI= process.env.MONGODB_URI || "mongodb://localhost:27017/testdb"
mongoose.connect(CONNECTION_URI, {useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})


const PORT = process.env.PORT || 3030

app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

app.use('/api', AuthRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


