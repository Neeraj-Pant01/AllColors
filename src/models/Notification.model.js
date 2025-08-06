const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const mongooseVirtuals = require("mongoose-lean-virtuals")

const notificationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    type:String,
    data:Object
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

notificationSchema.plugin(mongooseVirtuals)
notificationSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Notification', notificationSchema)