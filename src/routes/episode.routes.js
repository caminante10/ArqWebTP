import { Router } from "express";
import { getEpisodeByID, listEpisodes, updateEpisode, deleteEpisode } from "../controllers/episode.controller.js";

const episodeRouter = Router();

episodeRouter.get("/episodes", listEpisodes);
episodeRouter.get("/episodes/:id", getEpisodeByID);
episodeRouter.put("/episodes/:id", updateEpisode);
episodeRouter.delete("/episodes/:id", deleteEpisode);

export default episodeRouter;