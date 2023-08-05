import express from "express";
import ProdutoController from "../controller/produtoControler.js"
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/produto", ProdutoController.getAll, paginar)
    .get("/produto/busca", ProdutoController.findByDescription, paginar)
    .get("/produto/:id", ProdutoController.getOne)




export default router