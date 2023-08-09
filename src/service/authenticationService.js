import funcionario from "../models/funcionario.js";
import { compare } from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;


class AuthService {

    async login(dto){

            let user = await funcionario.find({email:dto.email}).limit(1);
            user = user[0];

            const senhasIguais = await compare(dto.password, user.password)
            

            if(!senhasIguais)
            { throw new Error ()}       
            // acssesToken --> recebe 3 parametros (objetoa ser enviado para token, secredo unico, parametros de consruçao)
            // nesse casso o unico parametro de construçao do token é o de tempo de expiração em segundos 3600 sec === 1h
            const acssesToken = sign({ id: user.id, email: user.email, perfil: user.perfil }, process.env.SEGREDO_TOKEN,{expiresIn:3600})
            
            const userToken = {              
                email: user.email,
                nome: user.nome,
                perfil: user.perfil,
                acssesToken 
            }

            return userToken
    }

}

export default AuthService