
exports.register = async(req,res,next) =>{
    try{
        const {userName, mobile, email, password, bio} = req.body;
        
    }catch(err){
        next(err)
    }
}