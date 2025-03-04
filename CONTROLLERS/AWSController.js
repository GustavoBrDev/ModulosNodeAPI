const { criar, buscarPorId, pegarDaAws } = require("../SERVICES/AWSService");

const criarImagem = async ( req, res ) => {
    const { idUser, imagem } = req.body;
    try {
        await criar(idUser, imagem);
        res.status(200).json("Imagem adicionada");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const pegarImagem = async ( req, res ) => {
    const { id } = req.params;
    try {    
        res.status(200).json( await buscarPorId(id) );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const pegarImagemDaAws = async ( req, res ) => {
    const { arquivoNome } = req.params;

    try {
        res.status(200).json( await pegarDaAws( arquivoNome) );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarImagem, pegarImagem, pegarImagemDaAws };