import { Types } from "mongoose";
import { Episode } from "../models/episode.js";

export const listEpisodes = function (req, res, next){
    let { limit, offset, name } = req.query;

    limit = limit || 10;
    offset = offset || 0;

    const query = name? {name:{$regex:name, $options:"i"}}:{};

    return Episode.find(query).skip(offset).limit(limit)
        .then((episodes) => res.json(episodes))
        .catch(next)
}

export const updateEpisode = function (req, res, next){
    const episodeId = req.params.id;
    const {name, duration, resume} = req.body;
    const updatedEpisode = {name, duration, resume};

    if (!Types.ObjectId.isValid(episodeId)) {
        res.status(404).send();
        return;
    }

    return Episode.validate(updatedEpisode)
        .then(() => Episode.findByIdAndUpdate(episodeId, updatedEpisode, {new:true}))
        .then((result) => {
            if (result)
                res.status(200).json(result);
            else
                res.status(404).send();
        })
        .catch(next)
}

export const deleteEpisode = function (req, res, next){
    const episodeId = req.params.id;

    if (!Types.ObjectId.isValid(episodeId)) {
        res.status(404).send();
        return;
    }

    return Episode.findByIdAndDelete(episodeId)
        .then( episode => {
            if (episode) {
                res.json(episode);
            } else {
                res.status(404).send();
            }
        })
        .catch(next);
}

export const getEpisodeByID = function (req, res, next){
    const episodeId = req.params.id;

    if (!Types.ObjectId.isValid(episodeId)) {
        res.status(404).send();
    }

    return Episode.findById(episodeId)
        .then( episode => {
            if (episode) {
                res.json(episode);
            } else {
                res.status(404).send();
            }
        })
        .catch(next);
}

