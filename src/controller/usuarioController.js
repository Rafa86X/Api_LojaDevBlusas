import { v4 as uuid } from "uuid";
import { usuario } from "../models/Usuario.js";
import { hashSync } from "bcrypt";

export class UsuarioController {
	async cadastrarUsuario(req, res) {
		try {
			const { email, password, passwordConfirmation } = req.body;

			const camposObrigatorios = ["email", "password", "passwordConfirmation"];

			for (const campo of camposObrigatorios) {
				if (!req.body[campo]) {
					return res.status(400).json({ message: `${campo} is mandatory` });
				}
			}

			if (password != passwordConfirmation) {
				return res.status(400).json({ message: "Passwords did not match" });
			}

			const existingUser = await usuario.findOne({ email });

			if (existingUser) {
				return res.status(400).json({ message: "User already exists" });
			}

			const id = uuid();

			const senhaHasheada = hashSync(password, 10);

			const usuarioCriado = await usuario.create({
				id,
				email,
				password: senhaHasheada,
			});

			if (usuarioCriado) {
				return res
					.status(201)
					.json({ message: `User registered successfully with id ${id}` });
			}

			throw new Error();
		} catch (error) {
			console.log({ error });
			return res.status(500).json({ message: "Internal server error" });
		}
	}
}
