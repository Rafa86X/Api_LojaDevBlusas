import express from "express";
import produtosfree from "./produtoRoutersFree.js";
import produtosBloked from "./produtoRoutesBloked.js";
import funcionarioRouter from "./funcionarioRouters.js";
import authLogin from "./authRoutes.js"
import cors from "cors";

const routes = (app) => {
	app.use(cors());

	app.route('/').get((req, res) => {
		res.status(200).send({titulo: "ส็็็็็็็็็็็็็็็็็็็็็็็็็༼ ຈل͜ຈ༽ส้้้้้้้้้้้้้้้้้้้้้้้ Loja DevBlusas ෴❤️෴"})
	})
	
	app.use(express.json(), 
		produtosfree, // metodo livre acesso
		authLogin, // metodo livre acesso - produz um token
		funcionarioRouter, // daqui para baixo é necessario - cada requisição presisa levar um token de acesso valido
		produtosBloked);
};

export default routes;
