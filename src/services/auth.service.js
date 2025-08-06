const bcryptJS = require("bcryptjs")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { createError } = require("../utils/createError");

exports.registerService = async (registerData) => {
        const hashpass = bcryptJS.hashSync(registerData.password)
        const response = new userModel({ ...registerData, password: hashpass });
           if (!response) throw createError('Something went wrong!', 500);
        const savedUser = await response.save();
        if(!savedUser) throw createError('unable to save 1', 500)
        return savedUser;
}

exports.loginService = async (loginData) =>{
    const user = await userModel.findOne({$or:[
        {email:loginData.email}, {mobile:loginData.mobile}
    ]})

    if(!user) throw createError(404,'user not found !')

    const validPass = bcryptJS.compareSync(loginData.password, user.password);

    if(!validPass) throw createError(404,'Invalid credentials')
    
    const token = jwt.sign({userId:user._id,username:user.userName,isAdmin:user.isAdmin},process.env.JWTSECRET, {expiresIn:'1d'})

    return {...user,token}
}