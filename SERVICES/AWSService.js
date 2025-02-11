const { pegarImagemNoBanco } = require("../REPOSITORY/AWSRepository");

async function criar ( imagem ) {
    try {
        return await criarImagemNoBanco( imagem );
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