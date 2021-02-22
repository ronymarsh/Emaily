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
        callbackURL: '/auth/google/callback'
    },
    (accessToken,refreshToken,profile,done) => {
        User.findOne({googleId:profile.id})
        .then((existingUser)=>{
            if(existingUser){ 
                //user ID already exists
               done(null,existingUser) 
            }
            else {
                //no user with this ID, create new user
                new User({googleId:profile.id})
                .save()
                .then(user=> done(null,user))
            } 

        })
    })
)