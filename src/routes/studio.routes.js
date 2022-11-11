import { Router } from "express";
import { getStudioByID, addStudio, listStudios, updateStudio, deleteStudio } from "../controllers/studio.controller.js";

const studioRouter = Router();

studioRouter.post("/studios", addStudio); 
studioRouter.get("/studios", listStudios);
studioRouter.get("/studios/:id", getStudioByID);
studioRouter.put("/studios/:id", updateStudio);
studioRouter.delete("/studios/:id", deleteStudio);

export default studioRouter;