const mongoose = require("mongoose")
const mongooseVirtuals = require("mongoose-lean-virtuals")
const mongoosePaginate = require("mongoose-paginate-v2");

const postsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    title:{
        type:String,
        required:true
    },
    media:{
        type:[String],
    },
    desc:{
        type:String,
        required:true
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:['User']
    },
    ispaid:{
        type:Boolean,
        default:false
    },
    others:{
        type: Object
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

mongoose.virtual('likesCount').get(function(){
    return this.likes.length
})
mongoose.virtual('userInfo',{
    ref:'User',
    localFeild:'userId',
    foreignField:'_id',
    justOne: true,
    options: {select :'userName avatarUrl'}
})

mongoose.plugin(mongooseVirtuals)
mongoose.plugin(mongoosePaginate)

module.exports = mongoose.model('Post', postsSchema)