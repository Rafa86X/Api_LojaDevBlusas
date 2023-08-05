import express from "express";
import produtosfree from "./produtoRoutersFree.js";
import produtosBloked from "./produtoRoutesBloked.js";
import usuarioRouter from "./usuarioRouters.js";
import authLogin from "./authRoutes.js"
import cors from "cors";

const routes = (app) => {
	app.use(cors());

	app.use(express.json(), 
		produtosfree, // metodo livre acesso
		authLogin, // metodo livre acesso - produz um token
		usuarioRouter, // daqui para baixo é necessario - cada requisição presisa levar um token de acesso valido
		produtosBloked);
};

export default routes;
