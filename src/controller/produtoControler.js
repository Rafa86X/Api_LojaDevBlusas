import produto from "../models/Produto.js";
import { AutenticadorPorEndpoit } from "../service/AutenticatorToEndPoit.js";

class ProdutoController {


    static gettable = () =>{ return "produtos"}

    static findByDescription = async (req, res, next) =>{
        
        try {

            const { descricao } = req.query;
            
            
            const regex = new RegExp(descricao, "i")
            const findx = {}
            if(descricao) findx.caract_busca = regex
            const itensResp = produto.find(findx);

            const numProdutos = (await produto.find(findx)).length
            req.resultado = itensResp;
            req.numProdutos = numProdutos;


            next()            
            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro na busca.`});
        }
    }



    static getAll = async (req, res, next) =>{

        try {
       
        const numProdutos = (await produto.find()).length
        const getProdutos = produto.find()
        req.resultado = getProdutos;
        req.numProdutos = numProdutos;
        next()           
            
        } catch (error) {
            res.status(500).json({ message: `${error}` });
        }
        
    }

    static getOne =async (req, res) =>{

        const id = req.params.id;

        try {

            const item = await produto.findById(id);
            res.status(200).json(item)
            
            
        } catch (error) {
            res.status(404).json({ message: `${error.message} - Id não encontrado.`});
        }
        
    }

    static create = async (req, res) =>{

        try {
            let objeto = new produto(req.body);

            const metodType = "c";
            const token = req.headers.authorization 
                     
            let testeEndpoit = await AutenticadorPorEndpoit(token, this.gettable(), metodType)
            if( testeEndpoit.testeAutorizacao == false){
                throw new Error(`O perfil de usuário '${testeEndpoit.perfil}' não tem perissão para realizar a ação.`)
            }
            
            const item = await objeto.save();

            res.status(201).json(item);
            
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao cadastrar Objeto.`});
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
        
            await produto.findByIdAndUpdate(id, {$set: req.body});
            var item = await produto.findById(id);
            var mensagem = {"messagem":"Produto atualizado com sucesso",item};
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
        
            await produto.findByIdAndDelete(id);
            res.status(200).json({messagem:"Produto deletado com sucesso"})
      
          } catch (erro) {
            res.status(500).send({message: erro.message});
          }

}   

}

export default ProdutoController