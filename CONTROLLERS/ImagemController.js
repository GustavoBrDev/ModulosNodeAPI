const { criarImagem, buscarPorId, listarImagens, editarImagem, removerImagem } = require('../SERVICES/ImagemService');

const criar = async (req, res) => {
    const { referencia, data_criacao, titulo } = req.body;

    try {
        await criarImagem(referencia, data_criacao, titulo);
        res.status(200).json("Imagem adicionada");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obterPorId = async ( req, res ) => {
    const { id } = req.params;

    try {
        const imagem = await buscarPorId(id);    
        res.status(200).json(imagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const listar = async ( req, res ) => {
    try {
        const lista = await listarImagens();
        res.status(200).json(lista);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const atualizar = async ( req, res ) => {
    const {id} = req.params;
    const {referencia, data_criacao, titulo } = req.body;

    try {
        await editarImagem ( id, referencia, data_criacao, titulo );
        res.status(200).json("Imagem atualizada");
    } catch ( error ){
        res.status(400).json( { error: error.message } );
    }
}


const deletar = async ( req, res ) => {
    const {id} = req.params;

    try {
        await removerImagem ( id );
        res.status(200).json("Imagem removida");
    } catch ( error ){
        res.status(400).json( { error: error.message } );
    }
    
}

module.exports = { criar, obterPorId, listar, atualizar, deletar };