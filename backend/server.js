const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

console.log('Opsie Server Running')

app.listen(port)