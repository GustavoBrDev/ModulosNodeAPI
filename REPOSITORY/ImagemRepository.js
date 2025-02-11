const { con } = require('./ConexaoBanco');

function adicionarImagem ( imagem ) {
    return new Promise ((resolve, reject) => {
        const sql = "INSERT INTO tb_imagem (referencia, data_criacao, titulo) VALUES (?, ?, ?)";
        con.query(sql, [imagem.referencia, imagem.data_criacao, imagem.titulo], (err, results) => {
            if (err) {
                reject(new Error("Erro ao adicionar imagem: " + err.message));
            } else {
                resolve(results);
            }
        });
    });
}

function buscarImagemPorId(id) {
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

function listarImagensNoBanco() {
    return new Promise ((resolve, reject) => {
        const sql = "SELECT * FROM tb_imagem";
        con.query(sql, (err, results) => {
            if (err) {
                reject(new Error("Erro ao listar imagens: " + err.message));
            } else {
                resolve(results);
            }
        });
    });
}

function atualizarImagem ( imagem, id ){

    return new Promise ( ( resolve, reject) => {

        var sql = "UPDATE tb_imagem SET referencia = ?, data_criacao = ?, titulo = ? WHERE id = ? ";

        con.query ( sql, [ imagem.referencia, imagem.data_criacao, imagem.titulo, id ], ( err, results) => {
            
            if (err) {
                reject(new Error("Erro ao atualizar imagem " + err.message));
            } else {
                resolve(results);
            }
            
        });

    });

}

function deletarImagem ( id ){

    return new Promise ( ( resolve, reject ) => {

        var sql = "DELETE FROM tb_imagem WHERE id = ?";

        con.query ( sql, [ id ], ( err, results) => {
            
            if (err) {
                reject(new Error("Erro ao remover imagem " + err.message));
            } else {
                resolve(results);
            }
            
        });

    });

}

module.exports = { adicionarImagem, buscarImagemPorId, listarImagensNoBanco, atualizarImagem, deletarImagem };
