const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json() , express.urlencoded({extended : true}))
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

require('./config/mongoose.config')
require('./routes/User.routes')(app)

app.listen(8000 , () => console.log('working' , process.env.SECRET_KEY))