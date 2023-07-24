import express from "express";
import { UsuarioController } from "../controller/usuarioController.js";

const usuarioRouter = express.Router();

const usuarioController = new UsuarioController();

usuarioRouter.post("/cadastro", usuarioController.cadastrarUsuario);

export { usuarioRouter };
