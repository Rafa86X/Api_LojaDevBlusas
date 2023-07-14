import produto from "../models/Produto.js";

class ProdutoController {

    static findByDescription = async (req, res, next) =>{
        
        try {

            const { descricao } = req.query;
            const regex = new RegExp(descricao, "i")
            const findx = {}
            if(descricao) findx.descricao = regex
            const itensResp = produto.find(findx);
            const numProdutos = (await produto.find(findx)).length
            req.resultado = itensResp;
            req.numProdutos = numProdutos;
            next()            
            
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor na busca" });
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
            res.status(404).json({ message: "Id não encontrado" });
        }
        
    }

    static create = async (req, res) =>{

        try {
            let objeto = new produto(req.body);
            
            const item = await objeto.save();

            res.status(201).json(item);
            
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao cadastrar Objeto.`});
        }

    }

    static updater = async (req, res) =>{

        try {
            const id = req.params.id;
        
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
        
            await produto.findByIdAndDelete(id);
            res.status(200).json({messagem:"Produto deletado com sucesso"})
      
          } catch (erro) {
            res.status(500).send({message: erro.message});
          }

}   }

export default ProdutoController