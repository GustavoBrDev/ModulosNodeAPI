const { con } = require('./ConexaoBanco');

function adicionarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO tb_usuario (nome, data_criacao) VALUES (?, ?)";
        con.query(sql, [usuario.nome, usuario.data_criacao], (err, results) => {
            if (err) {
                reject(new Error("Erro ao adicionar usuário: " + err.message));
            } else {
                resolve(results);
            }
        });
    });
}

function buscarUsuarioPorId(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tb_usuario WHERE id = ?";
        con.query(sql, [id], (err, results) => {
            if (err) {
                reject(new Error("Erro ao buscar usuário: " + err.message));
            } else {
                resolve(results[0]);
            }
        });
    });
}

function listarUsuariosNoBanco() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tb_usuario";
        con.query(sql, (err, results) => {
            if (err) {
                reject(new Error("Erro ao listar usuários: " + err.message));
            } else {
                resolve(results);
            }
        });
    });
}

function atualizarUsuario ( usuario ){

    return new Promise ( ( resolve, reject) => {

        var sql = "UPDATE tb_usuario SET nome = ?, data_criacao = ? WHERE id = ? ";

        con.query ( sql, [ usuario.nome, usuario.data_criacao, usuario.id], ( err, results) => {
            
            if (err) {
                reject(new Error("Erro ao atualizar usuário " + err.message));
            } else {
                resolve(results);
            }
            
        });

    });

}

function deletarUsuario ( id ){

    return new Promise ( ( resolve, reject ) => {

        var sql = "DELETE FROM tb_usuario WHERE id = ?";

        con.query ( sql, [ id ], ( err, results) => {
            
            if (err) {
                reject(new Error("Erro ao remover usuário " + err.message));
            } else {
                resolve(results);
            }
            
        });

    });

}

module.exports = { adicionarUsuario, buscarUsuarioPorId, listarUsuariosNoBanco, atualizarUsuario, deletarUsuario };
