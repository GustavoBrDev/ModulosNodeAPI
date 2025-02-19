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

module.exports = { conectarBanco };