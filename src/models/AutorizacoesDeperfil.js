import mongoose from "mongoose";

const autPerfilSchema = new mongoose.Schema(
	{
		perfil: { type: String, required: true },
		tabela_permisao: { type: String, required: true }
	},
	{
		versionKey: false,
	}
);

const autPerfi = mongoose.model("AutorizacoesDeperfil", autPerfilSchema);

export default autPerfi;