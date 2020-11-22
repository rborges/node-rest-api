require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')

const host = "127.0.0.1"
const port = 3000

app.get('/', (request, response)=>{

    console.log(`Server running at http://${host}:${port}`);
})
/*
mongoose.connect(process.env.DATABASE_STRING, { useNewUrlParser: true, useUnifiedTopology:true})

const database = mongoose.connection
database.on('error', (err) => console.log(err))
database.once('open', ()=> {
    console.log('database conected')
})
*/
app.use(express.json)

const subscribers = require('./routes/subscribers')
app.use('/subscribers', subscribers)

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
})