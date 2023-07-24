import express from "express";
import produtos from "./produtoRoutes.js";
import cors from "cors";
import { usuarioRouter } from "./usuarioRoutes.js";

const routes = (app) => {
	app.use(cors());

	app.route("/").get((req, res) => {
		res.status(200).send({ titulo: "Loja DevBlusas" });
	});

	app.use(express.json(), produtos, usuarioRouter);
};

export default routes;
