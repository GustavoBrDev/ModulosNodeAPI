const { criarImagemNoBanco, pegarImagemNoBanco, baixarImagem } = require("../REPOSITORY/AWSRepository");
let s3;

const conectarAws = () => {
    
    console.log('Conectando ao AWS...');

    const AWS = require('aws-sdk');

    // Configuração das credenciais AWS
    AWS.config.update({
        region: 'us-west-1',  
        accessKeyId: '',
        secretAccessKey: ''
    });

    s3 = new AWS.S3();
}

async function criar ( idUser, imagem ) {
    try {

        if ( ! imagem || ! idUser ){
            throw error;
        }

        if ( ! s3 ){
            conectarAws();
        }

        return await criarImagemNoBanco( idUser, imagem, s3 );

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

        if ( ! s3 ){
            conectarAws();
        }

        return await baixarImagem( arquivoNome, s3 );
    } catch ( error ) {
        console.error ( "Erro ao baixar imagem: ", error.message);
        throw error;
    }
}

module.exports = { criar, buscarPorId, pegarDaAws };