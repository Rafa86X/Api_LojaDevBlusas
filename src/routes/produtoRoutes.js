import express from "express";
import ProdutoController from "../controller/produtoControler.js"
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/produto", ProdutoController.getAll, paginar)
    .get("/produto/busca", ProdutoController.findByDescription, paginar)
    .get("/produto/:id", ProdutoController.getOne)
    .post("/produto", ProdutoController.create)
    .put("/produto/:id", ProdutoController.updater)
    .delete("/produto/:id", ProdutoController.deleter)



export default router