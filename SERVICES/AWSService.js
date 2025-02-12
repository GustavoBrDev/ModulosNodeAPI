const { criarImagemNoBanco, pegarImagemNoBanco } = require("../REPOSITORY/AWSRepository");

async function criar ( idUser ) {
    try {
        return await criarImagemNoBanco( idUser );
    } catch ( error ) {
        console.error ( "Erro ao criar imagem: ", error.message);
        throw error;
    }
}

async function pegarImagem ( referencia ) {
    try {
        return await pegarImagemNoBanco( referencia );
    } catch ( error ) {
        console.error ( "Erro ao pegar imagem: ", error.message);
        throw error;
    }
}

module.exports = { criar, pegarImagem };