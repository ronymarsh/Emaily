const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20').Strategy
const mongoose=require('mongoose')
const keys=require('../config/keys')

const User= mongoose.model('users')

// turn user into token, which is user.id
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//turn user.id token (user.id) into user 
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user =>{
        done(null,user)
    })
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken,refreshToken,profile,done) => {
        const existingUser=await User.findOne({googleId:profile.id})

        if(existingUser){ 
            //user ID already exists
            return done(null,existingUser) 
        } 
        
        //no user with this ID, create new user
        const user= await new User({googleId:profile.id}).save()
        done(null,user)
         
    })
)