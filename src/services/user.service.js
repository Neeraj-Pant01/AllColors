const userModel = require("../models/user.model")
const { createError } = require("../utils/createError")
const bcryptJS = require("bcryptjs");

exports.updateUser = async (userId, updateData) => {
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

exports.getAUser = async (userId) => {
    const response = await userModel.findById(userId).populate('CreatorProfile')
    if (!response) throw createError(404, "user not found !")
    return response;
}

exports.deleteUser = async (userId) => {
    const response = await userModel.findByIdAndUpdate(userId, {
        $set: { isDeleted: true }
    }, {
        new: true,
        runValidators: true
    })
    if (!response) throw createError(404, 'user not found !')
    return { message: "user deled successfully !" }
}

exports.updatePassword = async (userId, oldPassword, newPassWord) => {
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