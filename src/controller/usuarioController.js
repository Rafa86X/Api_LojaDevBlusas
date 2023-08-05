import usuario from "../models/Usuario.js";
import { hash } from "bcrypt";
import userExist from "../service/userExists.js";
import { AutenticadorPorEndpoit } from "../service/AutenticatorToEndPoit.js";


class UsuarioController {

   static gettable = () =>{ return "usuarios"}

   static findAll = async (req, res) =>{
        
        try {

            const metodType = "r";
            const token = req.headers.authorization          
            
            if( await AutenticadorPorEndpoit(token, this.gettable(), metodType) == false){
                throw new Error("O usuario não tem perissão para realizar a ação")
            }

            const result = (await usuario.find())
            res.status(200).json(result);
            
        } catch (error) {
            res.status(400).json({ message: `${error.message} - Erro na busca.`});
        }
    }

    
   static createUser = async (req, res) =>{
        
    try {

        const metodType = "c";
        const token = req.headers.authorization          
        
        if( await AutenticadorPorEndpoit(token, this.gettable(), metodType) == false){
            throw new Error("O usuario não tem perissão para realizar a ação")
        }

        let reqUser = new usuario(req.body);

        const { email, password } = reqUser

        
        if(await userExist(email))
            { throw new Error('Usuario ja cadastrado');}
        else{
            const passwordCrypto = await hash(password, 8)    
            reqUser.password = passwordCrypto;                     
            const newUser = await reqUser.save();
            res.status(201).json({  usuario: newUser.email,
                                    nome: newUser.nome,
                                    perfil: newUser.perfil });
        }
       
        
        } catch (error) {
            res.status(422).json({ message: `${error.message} - Erro ao cadastrar.`});
        }
   }


}

export default UsuarioController