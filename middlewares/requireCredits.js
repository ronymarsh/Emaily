//next is the function to be called after response is recieved
module.exports=(req,res,next)=>{
    if(req.user.credits < 1){
        return res.status(403).send({error:'Not enough credits!'})
    }
    
    next()
}