import { Router } from "express";
import { getAnimeByID, addAnime, listAnimes, updateAnime, deleteAnime, addEpisodeToAnime } from "../controllers/anime.controller.js";

const animeRouter = Router();

animeRouter.get("/animes", listAnimes);
animeRouter.post("/animes", addAnime);
animeRouter.get("/animes/:id", getAnimeByID);
animeRouter.put("/animes/:id", updateAnime);
animeRouter.delete("/animes/:id", deleteAnime);
animeRouter.post("/animes/:id/episode", addEpisodeToAnime);

export default animeRouter;