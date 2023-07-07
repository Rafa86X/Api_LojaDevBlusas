import produto from "../models/Produto.js";

class ProdutoController {

    static listarProdutos = (req, res) =>{
        
        produto.find((err, produto)=>{
            res.status(200).json(produto)
        })
    }

    static buscaProduto = (req, res) =>{

        const id = req.params.id;

        produto.findById(id, (err, produto)=>{
            if(!err){
                res.status(200).json(produto)
            }
            else{
                res.status(400).send({message:`${err.message} - id do produto não encontrado.`})
            }
        })

        
    }

    static cadastrarProdutos = (req, res) =>{
        let livro = new produto(req.body);

        livro.save((err)=>{
            if(err){
                res.status(500).send({message:`${err.message} - falha ao cadastrar produto.`})
            }
            else{
                res.status(201).send(livro.toJSON())
            }
        })
        
    }

    static atualizarProdutos = (req, res) =>{

        const id = req.params.id;

        produto.findByIdAndUpdate(id, {$set:req.body}, (err)=>{
            if(!err){
                res.status(200).send({message:'Produto atualizado com sucesso.'})
            }
            else{
                res.status(500).send({message:`${err.message} - falha ao atualizar produto.`})
            }
        })
    }

    static deletarProdutos = (req, res) =>{

        const id = req.params.id;

        produto.findByIdAndDelete(id, (err)=>{
            if(!err){
                res.status(200).send({message:'Produto deletado com sucesso.'})
            }
            else{
                res.status(500).send({message:`${err.message} - falha ao deletar produto.`})
            }
        })
    }

}

export default ProdutoController