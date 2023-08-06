import express from "express";
import usuario from "../controller/usuarioController.js"
import { autenticater } from "../middlewares/authenticate.js";
 

const router = express.Router();

router.use(autenticater)

router
    .get("/usuarios", usuario.findAll)
    .get("/usuarios/:id", usuario.getOne)
    .post("/usuarios", usuario.createUser)
    .put("/usuarios/:id", usuario.updater)
    .delete("/usuarios/:id",usuario.deleter)





export default router