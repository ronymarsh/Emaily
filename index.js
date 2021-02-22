const express= require('express')
const mongoose=require('mongoose')
const cookieSession=require('cookie-session')
const passport=require('passport')
const keys=require('./config/keys')

//execute User.js that defines the user schema model 
require('./models/User')
//execute passport.js that defines authentication strategy
require('./services/passport')

//connect root to mongoDB with mongoose
mongoose.connect(keys.mongoURI)

//define express handler for http requests
const app=express()

app.use(
    cookieSession(
        {
            maxAge: 30 * 24 * 60 * 60 *1000, //cookie valid for 30 days
            keys:[keys.cookieKey] //encryption key
        }
    )
)

app.use(passport.initialize())
app.use(passport.session())


require('./routes/authRoutes')(app);

const PORT= process.env.PORT ||5000
app.listen(PORT)