const { con } = require('./ConexaoBanco');
const UUID = require('uuid');
const aws_bucketName = 'bucketmi74';
let s3;
let fs = require('fs');
const path = require('path');

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
        const sql = "SELECT * FROM tb_imagem_aws WHERE id = ?";
        con.query(sql, [id], (err, results) => {
            if (err) {
                reject(new Error("Erro ao buscar imagem: " + err.message));
            } else {
                resolve(results[0]);
            }
        });
    });
}

const baixarImagem = ( arquivoNome ) => {
    pegarNoAws(arquivoNome);
}

const mandarParaOAws = ( ref ) => {

    if ( !s3 ) {
        conectarAws();
    }

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

    uploadFile ( 'C:/Users/gustavo_stinghen/Documents/Cloud/ModulosNodeAPI/IMAGENS/starwars.jpg', aws_bucketName, ref );
}

const pegarNoAws = ( arquivoNome ) => {

    console.log('Pegando da AWS...');
    console.log(arquivoNome);

    if ( !s3 ) {
        conectarAws();
    }

    const downloadFile = (bucketName, keyName ) => {
        
        const params = {
          Bucket: bucketName,
          Key: keyName
        };
      
        s3.getObject(params).promise()
          .then(data => {
            
            const downloadsPath = path.join(require('os').homedir(), 'Downloads');
            const filePath = path.join(downloadsPath, arquivoNome);
            fs.writeFileSync(filePath, data.Body);
            
            console.log('Arquivo baixado com sucesso:', filePath);

          })
          .catch(err => {
            console.error('Erro ao baixar o arquivo:', err);
          });
      
      };
      
    // Exemplo de uso
    return downloadFile( aws_bucketName, arquivoNome );

}


module.exports = { criarImagemNoBanco, pegarImagemNoBanco, baixarImagem };