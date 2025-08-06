const mongoose = require("mongoose")
const moongooseVirtuals = require("mongoose-lean-virtuals")
const mongoosePaginate = require("mongoose-paginate-v2")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatarUrl:{
        Type:String
    },
    bio:String,
    isCreator:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    socialLinks:[String],
    subsCriptionPrice: Number,
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

userSchema.plugin(moongooseVirtuals)
userSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("User", userSchema)