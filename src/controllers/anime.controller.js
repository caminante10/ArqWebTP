import { Types } from "mongoose";
import { Anime } from "../models/anime.js";
import { Episode } from "../models/episode.js";

export const addAnime = function (req, res, next){
    const {name, genre, episodesQuantity, description, finished} = req.body;

    const anime = {name, genre, episodesQuantity, description, finished};

    return Anime.validate(anime)
        .then(() => new Anime(anime).save())
        .then((savedAnime) =>{ 
            if (savedAnime)
                res.status(201).json(savedAnime);
            else
                res.status(400).send();
        })
        .catch(next)
}

export const listAnimes = function (req, res, next){
    let { limit, offset, name } = req.query;

    limit = limit || 10;
    offset = offset || 0;

    const query = name? {name:{$regex:name, $options:"i"}}:{};


    return Anime.find(query).skip(offset).limit(limit)
        .populate("episodes")
        .then((animes) => res.json(animes))
        .catch(next)
}

export const updateAnime = function (req, res, next){
    const animeId = req.params.id;
    const {name, genre, episodesQuantity, description, finished} = req.body;
    const updatedAnime = {name, genre, episodesQuantity, description, finished};

    if (!Types.ObjectId.isValid(animeId)) {
        res.status(404).send();
        return;
    }

    return Anime.validate(updatedAnime)
        .then(() => Anime.findByIdAndUpdate(animeId, updatedAnime, {new:true}))
        .then((result) => {
            if (result)
                res.status(200).json(result);
            else
                res.status(404).send();
        })
        .catch(next)
}

export const deleteAnime = function (req, res, next){
    const animeId = req.params.id;

    if (!Types.ObjectId.isValid(animeId)) {
        res.status(404).send();
        return;
    }

    return Anime.findByIdAndDelete(animeId)
        .then( anime => {
            if (anime) {
                res.json(anime);
            } else {
                res.status(404).send();
            }
        })
        .catch(next);
}

export const getAnimeByID = function (req, res, next){
    const animeId = req.params.id;

    if (!Types.ObjectId.isValid(animeId)) {
        res.status(404).send();
        return;
    }

    return Anime.findById(animeId)
        .then( anime => {
            if (anime) {
                return anime.populate("episodes");
            } else {
                res.status(404).send();
            }
        })
        .then(anime => res.json(anime))
        .catch(next);
}

export const addEpisodeToAnime = function (req, res, next){
    const animeId = req.params.id;

    if (!Types.ObjectId.isValid(animeId)) {
        res.status(404).send();
        return;
    }

    const {name, duration, resume} = req.body;

    const episode = {name, duration, resume};
    let savedEpisode = null;

    return Episode.validate(episode)
        .then(() => new Episode(episode).save())
        .then(result => {
            if (!result){
                res.status(400).send();
                return null;
            }

            savedEpisode = result;
            return Anime.findById(animeId);
        })
        .then((anime) =>{ 
            anime?.episodes.push(savedEpisode);
            return anime?.save();
        })
        .then((updatedAnime) => {
            if (updatedAnime){
                res.status(201).json(savedEpisode);
            }
        })
        .catch(next)
}



