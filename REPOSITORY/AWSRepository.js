const { con } = require('./ConexaoBanco');
const { s3, fs } = require('./ConexaoBanco');
const UUID = require('uuid');
const aws_bucketName = 'bucketmi74';

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

const baixarImagem = ( ref, arquivoNome ) => {
    return new Promise ((resolve, reject) => {
       const sql = "SELECT * FROM tb_imagem_aws WHERE ref = ?";
       con.query(sql, [ref], (err, results) => {
           if (err) {
               reject(new Error("Erro ao buscar imagem: " + err.message));
           } else {
               resolve(results[0]);
               pegarNoAws(arquivoNome);
           }
       }) 
    })
}

const mandarParaOAws = ( ref ) => {

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

    const downloadFile = (bucketName, keyName, downloadPath) => {
        
        const params = {
          Bucket: bucketName,
          Key: keyName
        };
      
        const file = fs.createWriteStream(downloadPath);
      
        s3.getObject(params).createReadStream().pipe(file);
      
        file.on('close', () => {
          console.log('Arquivo baixado com sucesso:', downloadPath);
        });
      };
      
      // Exemplo de uso
      downloadFile( aws_bucketName, arquivoNome, 'C:/Users/gustavo_stinghen/Documents/Cloud/ModulosNodeAPI/IMAGENS');

}


module.exports = { criarImagemNoBanco, pegarImagemNoBanco, baixarImagem };