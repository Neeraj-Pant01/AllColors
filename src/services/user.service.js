const userModel = require("../models/user.model")
const { createError } = require("../utils/createError")
const bcryptJS = require("bcryptjs");

exports.updateUserService = async (userId, updateData) => {
    if (updateData.password) throw createError(403, "cannot updadte password !")
    const response = await userModel.findByIdAndUpdate(userId, {
        $set: updateData
    }, {
        new: true,
        runValidators: true
    })
    if (!response) throw createError(404, "unauthorized access !")
    return response;
}

exports.getAUserService = async (userId) => {
    const response = await userModel.findById(userId).populate('CreatorProfile')
    if (!response) throw createError(404, "user not found !")
    return response;
}

exports.disableUserService = async (userId) => {
    const response = await userModel.findByIdAndUpdate(userId, {
        $set: { isDeleted: true }
    }, {
        new: true,
        runValidators: true
    })
    if (!response) throw createError(404, 'user not found !')
    return { message: "user deled successfully !" }
}

exports.deleteUser = async (userId) =>{
    
}

exports.updatePasswordService = async (userId, oldPassword, newPassWord) => {
    const user = await userModel.findById(userId);
    if (!user) throw createError(404, 'user not found !')
    const oldPass = oldPassword;
    const isValid = bcryptJS.compareSync(oldPass, user.password)
    if (!isValid) throw createError(403, "password didn't matched !");
    if (oldPassword === newPassWord) {
        throw createError(400, 'New password must be different from the old one');
    }
    const newPass = bcryptJS.hashSync(newPassWord, 10)
    user.password = newPass;
    await user.save();
    return {message:"updated password successfully !"}
}

exports.getAllUsers = async (q,page, limit) =>{
    const {search, userName, email, mobile, isCreator, isDeleted, userId} = q;
    const filters = {
        ...(search && {
            $or:[
                {userName : {$regex: search, $options: 'i'}},
                {email : {$regex: search, $options: 'i' }}
            ]
        })
    }
    const users = await userModel
}