const { con } = require('./ConexaoBanco');
const UUID = require('uuid');

const criarImagemNoBanco = (imagem) => {
    return new Promise ((resolve, reject) => {
        const ref = UUID.v4();
        const sql = "INSERT INTO tb_imagem_aws (referencia, idUser) VALUES (?, ? )";
        con.query(sql, [ref, imagem.idUser], (err, results) => {
            if (err) {
                reject(new Error("Erro ao criar imagem: " + err.message));
            } else {
                resolve(results);
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

module.exports = { criarImagemNoBanco, pegarImagemNoBanco };