//next is the function to be called after response is recieved
module.exports=(req,res,next)=>{
    if(!req.user){
        return res.status(401).send({error:'You must log in'})
    }
    
    next()
}