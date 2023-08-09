import mongoose from "mongoose";

const funcSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		nome: { type: String, required: true },
		perfil: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		versionKey: false,
	}
);

const funcionario = mongoose.model("funcionario", funcSchema);

export default funcionario;
