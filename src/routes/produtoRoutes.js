import express from "express";
import ProdutoController from "../controller/produtoControler.js"

const router = express.Router();

router
    .get("/produto", ProdutoController.listarProdutos)
    .get("/produto/:id", ProdutoController.buscaProduto)
    .post("/produto", ProdutoController.cadastrarProdutos)
    .put("/produto/:id", ProdutoController.atualizarProdutos)
    .delete("/produto/:id", ProdutoController.deletarProdutos)



export default router