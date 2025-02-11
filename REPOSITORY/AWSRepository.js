const { con } = require('./ConexaoBanco');

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

module.exports = { pegarImagemNoBanco };