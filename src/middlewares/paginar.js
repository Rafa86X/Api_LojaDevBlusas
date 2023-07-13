async function paginar(req, res, next) {

try {
        const { limite = 10, pagina = 1 } = req.query;


        const resultado = req.resultado;
        const numProdutos = req.numProdutos
        const arreyItens = await resultado.find()
            .sort({ nome: 1 })
            .skip((pagina - 1) * limite)
            .limit(limite)
            .exec()
        
        
            
        const numeroPaginas = numProdutos/limite
        
        const paginacao = {paginacao : {
            numeroTotalItens: numProdutos,
            numeroItensPorPagina: limite,
            paginaAtual: pagina,
            numeroTotaldePaginas: numeroPaginas.toFixed()
        }}
       const resultCompleto = arreyItens.concat(paginacao);

    res.status(200).json(resultCompleto);
    
} catch (error) {
    res.status(500).json({ message: `${error} erro no middwarer` });
    
}
}

export default paginar