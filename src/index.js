import express from "express";
import * as mongoose from "mongoose";
import episodeRouter from "./routes/episode.routes.js";
import animeRouter from "./routes/anime.routes.js";
import studioRouter from "./routes/studio.routes.js";
import { errorsMiddleware } from "./middlewares/erros.middleware.js";

const app = express();

app.use(express.json());

app.use(episodeRouter)
app.use(animeRouter)
app.use(studioRouter)

app.use(errorsMiddleware)

mongoose.connect("mongodb://127.0.0.1:27017/db-tp", error => { 
    if (error){
        console.log("No se pudo conectar a la base: " + error);
        return;
    }
    console.log("Se conectó a la base de datos");
    app.listen(3000, () => {
        console.log("Escuchando en el puerto 3000");
    })
})