const { criar, buscarPorId, pegarDaAws } = require("../SERVICES/AWSService");

const criarImagem = async ( req, res ) => {
    const { idUser } = req.body;
    try {
        await criar(idUser);
        res.status(200).json("Imagem adicionada");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const pegarImagem = async ( req, res ) => {
    const { id } = req.params;
    console.log("Pegar imagem");

    try {
        await buscarPorId(id);    
        res.status(200).json(imagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const pegarImagemDaAws = async ( req, res ) => {
    console.log("Pegar imagem da aws");
    const { referencia, arquivoNome } = req.params;

    try {
        await pegarDaAws(referencia, arquivoNome);
        res.status(200).json(imagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarImagem, pegarImagem, pegarImagemDaAws };