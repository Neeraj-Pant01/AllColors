const mongoose = require("mongoose")
const mongooseVirtuals = require("mongoose-lean-virtuals")
const mongoosePaginate = require("mongoose-paginate-v2")


const paymentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    currency:String,
    status:{
        type:String,
        enum:['pending','success','failed']
    },
    type:{
        type:String,
        enum:['subscription','tip','ppv']
    },
    processor:{
        type:String,
        required:true
    },
    transactionId:{
        type:String,
        required:true,
        index:true
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

paymentSchema.plugin(mongooseVirtuals)
paymentSchema.plugin(mongoosePaginate) 

module.exports = mongoose.model('Payment', paymentSchema)