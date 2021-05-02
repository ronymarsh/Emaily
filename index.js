const express= require('express')
const mongoose=require('mongoose')
const cookieSession=require('cookie-session')
const passport=require('passport')
const bodyParser=require('body-parser')
const keys=require('./config/keys')

//execute User.js that defines the user schema model 
require('./models/User')
//execute Survey.js that defines the survey schema model
require('./models/Survey')
//execute passport.js that defines authentication strategy
require('./services/passport')

//connect root to mongoDB with mongoose
mongoose.connect(keys.mongoURI)

//define express handler for http requests
const app=express()

app.use(bodyParser.json())

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

//reuqire the routes files and invoke the exported funtcion of each file on app 
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV==='production'){
    //Express will serve up production assets like main.js file or main.css file, happens first!
    app.use(express.static('client/build'))
    
    //Express will serve up the index.html file if it doesn't recognize the route
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT= process.env.PORT ||5000
app.listen(PORT)