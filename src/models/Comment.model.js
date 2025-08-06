const mongoose = require("mongoose")
const mongooseVirtuals = require("mongoose-lean-virtuals")
const mongoosePaginate = require("mongoose-paginate-v2")

const CommentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true,
        index:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        default:null,
        index:true
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})


CommentSchema.virtual('userIfno',{
    ref:'User',
    localField:'userId',
    foreignField:'_id',
    options:{select : 'username avatarUrl'},
    justOne:true
})

CommentSchema.virtual('repliesCounts',{
    ref:'Comment',
    localField:'_id',
    foreignField:'parent',
    count:true
})


CommentSchema.plugin(mongooseVirtuals)
CommentSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Comment', CommentSchema)