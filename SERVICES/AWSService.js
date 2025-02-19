const { criarImagemNoBanco, pegarImagemNoBanco, baixarImagem } = require("../REPOSITORY/AWSRepository");

async function criar ( idUser ) {
    try {
        return await criarImagemNoBanco( idUser );
    } catch ( error ) {
        console.error ( "Erro ao criar imagem: ", error.message);
        throw error;
    }
}

async function buscarPorId ( referencia ) {
    try {
        return await pegarImagemNoBanco( referencia );
    } catch ( error ) {
        console.error ( "Erro ao pegar imagem: ", error.message);
        throw error;
    }
}

async function pegarDaAws ( arquivoNome ) {
    try {
        return await baixarImagem( arquivoNome );
    } catch ( error ) {
        console.error ( "Erro ao baixar imagem: ", error.message);
        throw error;
    }
}

module.exports = { criar, buscarPorId, pegarDaAws };