const { adicionarImagem, buscarImagemPorId, listarImagensNoBanco, atualizarImagem, deletarImagem } = require('../REPOSITORY/ImagemRepository');
const Imagem = require('../MODELS/Imagem'); 

async function criarImagem (referencia, data_criacao, titulo) {
    let imagem = new Imagem(null, referencia, data_criacao, titulo);

    try {
        await adicionarImagem(imagem);
    } catch (error) {
        console.error("Erro ao adicionar imagem ao banco de dados:", error.message);
        throw error;
    }
}

async function buscarPorId(id) {
    try {
        return await buscarImagemPorId(id);
    } catch (error) {
        console.error("Erro ao buscar imagem no banco de dados:", error.message);
        throw error;
    }
}

async function listarImagens() {
    try {
        return await listarImagensNoBanco();
    } catch (error) {
        console.error("Erro ao listar imagens:", error.message);
        throw error;
    }
}

async function editarImagem ( id, referencia, data_criacao, titulo ){
    
    let imagem = new Imagem( referencia, data_criacao, titulo);
    imagem.id = id;

    try {
        await atualizarImagem( imagem, id ); 
    } catch (error) {
        console.error ( "Erro ao atualizar imagem: ", error.message);
    }
    
}

async function removerImagem ( id ){

    try {
        await deletarImagem( id );
    } catch ( error ){
        console.error ( "Erro ao remover imagem: ", error.message);
        throw error;
    }

}

module.exports = { criarImagem, buscarPorId, listarImagens, editarImagem, removerImagem };
