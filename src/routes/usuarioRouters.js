import express from "express";
import usuario from "../controller/usuarioController.js"
import { autenticater } from "../middlewares/authenticate.js";
 

const router = express.Router();

router.use(autenticater)

router
    .get("/usuarios", usuario.findAll)
    .post("/usuarios", usuario.createUser)




export default router