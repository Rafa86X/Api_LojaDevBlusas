
import pkg from 'jsonwebtoken';
import autPerfi from '../models/AutorizacoesDeperfil.js';
const { decode } = pkg;

export async function AutenticadorPorEndpoit( token, tabela, endpoit) {

        const tabelaMetodo = tabela+"_"+endpoit
        const [, acssesToken] = token.split(" ");
        const { perfil } = decode(acssesToken);
        let perfilAutorizacao = await autPerfi.find({perfil});
        let perfilEncontrado = perfilAutorizacao[0].perfil
        perfilAutorizacao= perfilAutorizacao[0].tabela_permisao.split(" ");
        const testeAutorizacao = perfilAutorizacao.includes(tabelaMetodo);
        return {testeAutorizacao, perfil:perfilEncontrado }
    
}