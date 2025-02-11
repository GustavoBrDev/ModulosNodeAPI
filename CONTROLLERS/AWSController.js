const { criar, buscarPorId } = require("../SERVICES/AWSService");

const criarImagem = async ( req, res ) => {
    const { imagem } = req.body;

    try {
        await criar(imagem);
        res.status(200).json("Imagem adicionada");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const pegarImagem = async ( req, res ) => {
    const { id } = req.params;

    try {
        const imagem = await buscarPorId(id);    
        res.status(200).json(imagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarImagem, pegarImagem };