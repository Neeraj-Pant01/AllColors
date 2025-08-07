const { registerService, loginService } = require("../services/auth.service");

exports.register = async(req,res,next) =>{
    try{
        const {userName, mobile, email, password, bio} = req.body;
        const registerData = {userName, mobile , email,password, bio}
        const response = await registerService(registerData);
        res.status(200).json(response)
    }catch(err){
        next(err)
    }
}

exports.login = async(req,res,next) =>{
    try{
        const {userName, email, password} = req.body;
        const logindata = {
            userName,
            email,
            password
        }
        const response = await loginService(logindata)
        res.status(200).json(response)
    }catch(err){
        next(err)
    }
}