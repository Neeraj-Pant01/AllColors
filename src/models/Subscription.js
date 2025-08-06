const mongoose = require("mongoose")
const mongooseVirtuals = require("mongoose-lean-virtuals")
const mongoosePaginate = require("mongoose-paginate-v2")

const subscriptionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    startDate:{
        type:Date,
        default: Date.now
    },
    endDate:{
        type:Date,
        required:true
    },
    paymentId:{
        type:String
    },
    status:{
        type:String,
        enum:['Active', 'Pending', 'Cancelled'],
        default:'Active'
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

subscriptionSchema.plugin(mongooseVirtuals)
subscriptionSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Subscription',subscriptionSchema)