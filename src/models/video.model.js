import mongoose, {mongo, Schema} from "mongoose";
// mongooseAggregatePaginate is mongoose plugin that simplifies pagination for data retrieved using MongoDB's aggregation pipeline, allowing you to easily fetch data in chunks (pages).
 
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type: String, // cloudnary url
        required: true,
    },
    thumbnail: {
        type: String, // cloudnary url
        required: true,
    },
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    duration: {
        type: Number, // from cloudnary
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

}, {timestamps: true});

videoSchema.plugin(mongooseAggregatePaginate)

export const Video= mongoose.model("Video", videoSchema);