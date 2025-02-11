const { pegarImagemNoBanco } = require("../REPOSITORY/AWSRepository");

async function pegarImagem ( referencia ) {
    try {
        return await pegarImagemNoBanco( referencia );
    } catch ( error ) {
        console.error ( "Erro ao pegar imagem: ", error.message);
        throw error;
    }
}

module.exports = { pegarImagem };