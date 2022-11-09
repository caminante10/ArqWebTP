import { Schema, model } from "mongoose";

const studioSchema = new Schema(
    {
        name: {
            required: true,
            type: String,
        },
        country: {
            required: true,
            type: String,
        },
        stablished: {
            required: true,
            type: Date,
        },
        animes: [
            {
                required: true,
                default: [],
                type: Types.ObjectId,
                ref: 'Anime',
            }
        ],
    },
    {
        collection: 'studios',
        timestamps: true,
        versionKey: false
    }
);

studioSchema.set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});

export const Studio = model('Studio', studioSchema);