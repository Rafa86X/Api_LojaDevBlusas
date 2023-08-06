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
                     
            let testeEndpoit = await AutenticadorPorEndpoit(token, this.gettable(), metodType)
            if( testeEndpoit.testeAutorizacao == false){
                throw new Error(`O perfil de usuário '${testeEndpoit.perfil}' não tem perissão para realizar a ação.`)
            }

            const result = (await usuario.find())
            res.status(200).json(result);
            
        } catch (error) {
            res.status(400).json({ message: `${error.message} - Erro na busca.`});
        }
    }

    static getOne =async (req, res) =>{

        
        try {
            const id = req.params.id;

            const metodType = "r";
            const token = req.headers.authorization          
            let testeEndpoit = await AutenticadorPorEndpoit(token, this.gettable(), metodType)
            if( testeEndpoit.testeAutorizacao == false){
                throw new Error(`O perfil de usuário '${testeEndpoit.perfil}' não tem perissão para realizar a ação.`)
            }

            const item = await usuario.findById(id);
            res.status(200).json(item)
            
            
        } catch (error) {
            res.status(404).json({ message: `${error.message} - Id não encontrado.`});
        }
        
    }

    
   static createUser = async (req, res) =>{
        
    try {

        const metodType = "c";
        const token = req.headers.authorization          
        
        let testeEndpoit = await AutenticadorPorEndpoit(token, this.gettable(), metodType)
        if( testeEndpoit.testeAutorizacao == false){
            throw new Error(`O perfil de usuário '${testeEndpoit.perfil}' não tem perissão para realizar a ação.`)
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


   static updater = async (req, res) =>{

       try {
        const id = req.params.id;

        const metodType = "u";
        const token = req.headers.authorization          
        let testeEndpoit = await AutenticadorPorEndpoit(token, this.gettable(), metodType)
        if( testeEndpoit.testeAutorizacao == false){
            throw new Error(`O perfil de usuário '${testeEndpoit.perfil}' não tem perissão para realizar a ação.`)
        }
    
        await usuario.findByIdAndUpdate(id, {$set: req.body});
        let user = await usuario.findById(id);
        let usuarioAualizado = {nome:user.nome, email:user.email, perfil:user.perfil}
        let mensagem = {"messagem":"Usuario atualizado com sucesso", usuarioAualizado};
        res.status(200).json(mensagem)
  
      } catch (erro) {
        res.status(500).send({message: erro.message});
      }

}

static deleter =async (req, res) =>{

    try {
        const id = req.params.id;

        const metodType = "d";
        const token = req.headers.authorization          
        let testeEndpoit = await AutenticadorPorEndpoit(token, this.gettable(), metodType)
        if( testeEndpoit.testeAutorizacao == false){
            throw new Error(`O perfil de usuário '${testeEndpoit.perfil}' não tem perissão para realizar a ação.`)
        }
    
        await usuario.findByIdAndDelete(id);
        res.status(200).json({messagem:"Usuario deletado com sucesso"})
  
      } catch (erro) {
        res.status(500).send({message: erro.message});
      }

}  

}

export default UsuarioController