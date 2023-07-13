import express from "express";
import ProdutoController from "../controller/produtoControler.js"

const router = express.Router();

router
    .get("/produto", ProdutoController.getAll)
    .get("/produto/busca", ProdutoController.findByDescription)
    .get("/produto/:id", ProdutoController.getOne)
    .post("/produto", ProdutoController.create)
    .put("/produto/:id", ProdutoController.updater)
    .delete("/produto/:id", ProdutoController.deleter)



export default router