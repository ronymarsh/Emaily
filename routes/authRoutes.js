const passport=require('passport')

module.exports=(app)=>{

    //route handler for logging in with google 
    app.get('/auth/google',
        passport.authenticate('google',{
            scope:['profile','email']
        }
    ))

    //route handler for auth callback from google
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req,res)=>{
            res.redirect('/surveys')
        }      //where the request is sent to after passport.authenticate is executed 
    );

    //route handler for logging out
    app.get('/api/logout',(req,res)=>{
        req.logout()
        res.redirect('/')
    })

    
    // route handler to check auth 
    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    })
};