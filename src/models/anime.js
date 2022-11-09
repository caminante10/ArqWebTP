import { Schema, model, Types } from "mongoose";

const animeSchema = new Schema(
    {
        name: {
            required: true,
            type: String,
        },
        episodes: [
            {
                required: true,
                default: [],
                type: Types.ObjectId,
                ref: 'Episode',
            }
        ],
        genre: {
            required: true,
            type: String,
        },
        episodesQuantity: {
            required: true,
            type: Number,
        },
        description: {
            required: true,
            type: String,
        },
        finished: {
            required: true,
            type: Boolean,
        },
    },
    {
        collection: 'animes',
        timestamps: true,
        versionKey: false
    }
);

animeSchema.set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});

export const Anime = model('Anime', animeSchema);