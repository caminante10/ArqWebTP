import { Schema, model } from "mongoose";

const episodeSchema = new Schema(
    {
        name: {
            required: true,
            type: String,
        },
        duration: {
            required: true,
            type: Number, //seconds
        },
        resume: {
            required: true,
            type: String,
        }
    },
    {
        collection: 'episodes',
        timestamps: true,
        versionKey: false
    }
);

episodeSchema.set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});

export const Episode = model('Episode', episodeSchema);
