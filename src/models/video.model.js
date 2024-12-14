import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema({
    videoFile:{
        type: String,
        required : true,
    },
    thumbnail:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true
    }, 
    duration: {
        type: Number,// we can get it from cloudinary
        required: true,
    },
    views:{
        type: Number,
         default: 0
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timeseries: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const VIdeo = mongoose.model("Video",videoSchema)