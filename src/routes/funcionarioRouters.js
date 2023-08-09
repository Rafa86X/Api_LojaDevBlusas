import express from "express";
import funcionario from "../controller/funcionarioController.js"
import { autenticater } from "../middlewares/authenticate.js";
 

const router = express.Router();

router.use(autenticater)

router
    .get("/funcionarios", funcionario.findAll)
    .get("/funcionarios/:id", funcionario.getOne)
    .post("/funcionarios", funcionario.createUser)
    .put("/funcionarios/:id", funcionario.updater)
    .delete("/funcionarios/:id",funcionario.deleter)





export default router