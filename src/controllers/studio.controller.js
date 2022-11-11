import { Types } from "mongoose";
import { Studio } from "../models/studio.js";

export const addStudio = function (req, res, next){
    const {name, country, stablished} = req.body;

    const studio = {name, country, stablished};

    return Studio.validate(studio)
        .then(() => new Studio(studio).save())
        .then((savedStudio) =>{ 
            if (savedStudio)
                res.status(201).json(savedStudio);
            else
                res.status(400).send();
        })
        .catch(next)
}

export const listStudios = function (req, res, next){
    let { limit, offset, name } = req.query;

    limit = limit || 10;
    offset = offset || 0;

    const query = name? {name:{$regex:name, $options:"i"}}:{};


    return Studio.find(query).skip(offset).limit(limit)
        .populate({path:"animes", select:"-episodes"})
        .then((studios) => res.json(studios))
        .catch(next)
}

export const updateStudio = function (req, res, next){
    const studioId = req.params.id;
    const {name, country, stablished} = req.body;
    const updatedStudio = {name, country, stablished};

    if (!Types.ObjectId.isValid(studioId)) {
        res.status(404).send();
        return;
    }

    return Studio.validate(updatedStudio)
        .then(() => Studio.findByIdAndUpdate(studioId, updatedStudio, {new:true}))
        .then((result) => {
            if (result)
                res.status(200).json(result);
            else
                res.status(404).send();
        })
        .catch(next)
}

export const deleteStudio = function (req, res, next){
    const studioId = req.params.id;

    if (!Types.ObjectId.isValid(studioId)) {
        res.status(404).send();
        return;
    }

    return Studio.findByIdAndDelete(studioId)
        .then( studio => {
            if (studio) {
                res.json(studio);
            } else {
                res.status(404).send();
            }
        })
        .catch(next);
}

export const getStudioByID = function (req, res, next){
    const studioId = req.params.id;

    if (!Types.ObjectId.isValid(studioId)) {
        res.status(404).send();
        return;
    }

    return Studio.findById(studioId)
        .then( studio => {
            if (studio) {
                return studio.populate({path:"animes", select:"-episodes"});
            } else {
                res.status(404).send();
            }
        })
        .then(studio => res.json(studio))
        .catch(next);
}

export const addAnimeToStudio = function (req, res, next){
    
}

export const listStudiosAnimes = function (req, res, next){
    
}
