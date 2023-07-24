import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
	{
		id: { type: String },
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		versionKey: false,
	}
);

const usuario = mongoose.model("usuario", usuarioSchema);

export { usuario };
