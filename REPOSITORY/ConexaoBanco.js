const mysql = require('mysql');

let con;

async function conectarBanco() {
    con = mysql.createConnection({
        user: 'root',
        password: '',
        database: 'db_desafio',
        host: 'localhost'
    });

    con.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err.message);
            return;
        }
        console.log('Conectado ao banco de dados com sucesso!');
    });

    module.exports = {con};
}

async function conectarAws (){
    
    const AWS = require('aws-sdk');

    // Configuração das credenciais AWS
    AWS.config.update({
        region: 'us-west-1',  
        accessKeyId: '',
        secretAccessKey: ''
    });

    const s3 = new AWS.S3();
    const fs = require('fs');

    module.exports = {s3, fs};
}

module.exports = { conectarBanco, conectarAws };