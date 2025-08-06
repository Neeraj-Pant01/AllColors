const mongoose = require("mongoose");
const mongooseVirtuals = require("mongoose-lean-virtuals")
const mongoosePaginate = require("mongoose-paginate-v2")

const creatorSchema = new mongoose.schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    payoutDetails:{
        type:Object
    },
    stats:Object
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

creatorSchema.plugin(mongooseVirtuals)
creatorSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('CreatorProfile', creatorSchema)