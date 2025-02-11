const { buscarPorId } = require("../SERVICES/AWSService");

const pegarImagem = async ( req, res ) => {
    const { id } = req.params;

    try {
        const imagem = await buscarPorId(id);    
        res.status(200).json(imagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { pegarImagem };