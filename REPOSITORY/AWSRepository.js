const { con } = require('./ConexaoBanco');
const UUID = require('uuid');

const criarImagemNoBanco = ( idUser) => {
    return new Promise ((resolve, reject) => {
        const ref = UUID.v4();
        const sql = "INSERT INTO tb_imagem_aws (ref, id_user) VALUES (?, ? )";
        con.query(sql, [ref, idUser], (err, results) => {
            if (err) {
                reject(new Error("Erro ao criar imagem: " + err.message));
            } else {
                resolve(results);
                mandarParaOAws(ref);
            }
        });
    });
}

const pegarImagemNoBanco = (id) => {
    return new Promise ((resolve, reject) => {
        const sql = "SELECT * FROM tb_imagem WHERE id = ?";
        con.query(sql, [id], (err, results) => {
            if (err) {
                reject(new Error("Erro ao buscar imagem: " + err.message));
            } else {
                resolve(results[0]);
            }
        });
    });
}

const mandarParaOAws = ( ref ) => {

    const AWS = require('aws-sdk');

    // Configuração das credenciais AWS
    AWS.config.update({
        region: 'us-west-1',  
        accessKeyId: '',
        secretAccessKey: ''
    });

    const s3 = new AWS.S3();
    const fs = require('fs');

    const uploadFile = (filePath, bucketName, keyName) => {

        const fileContent = fs.readFileSync(filePath);
    
        const params = {
            Bucket: bucketName,  // Nome do seu bucket S3
            Key: keyName,        // Nome do arquivo no S3
            Body: fileContent    // Conteúdo do arquivo
        };
    
        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Erro ao fazer o upload:', err);
            } else {
                console.log('Arquivo carregado com sucesso:', data.Location);
            }
        });
    };

    if ( fs.existsSync('C:/Users/gustavo_stinghen/Documents/Cloud/ModulosNodeAPI/IMAGENS/starwars.jpg') ){
        console.log('Arquivo existente');
    } else {
        console.log('Arquivo inexistente');
    }

    uploadFile ( 'C:/Users/gustavo_stinghen/Documents/Cloud/ModulosNodeAPI/IMAGENS/starwars.jpg', 'bucketmi74', ref );
}


module.exports = { criarImagemNoBanco, pegarImagemNoBanco };