const { adicionarUsuario, buscarUsuarioPorId, listarUsuariosNoBanco, atualizarUsuario, deletarUsuario } = require('../REPOSITORY/UsuarioRepository');
const Usuario = require('../MODELS/Usuario'); 

async function criarUsuario(nome, data_criacao) {
    let usuario = new Usuario(null, nome, data_criacao);

    try {
        await adicionarUsuario(usuario);
    } catch (error) {
        console.error("Erro ao adicionar usuário ao banco de dados:", error.message);
        throw error;
    }
}

async function buscarPorId(id) {
    try {
        return await buscarUsuarioPorId(id);
    } catch (error) {
        console.error("Erro ao buscar usuário no banco de dados:", error.message);
        throw error;
    }
}

async function listarUsuarios() {
    try {
        return await listarUsuariosNoBanco();
    } catch (error) {
        console.error("Erro ao listar usuários:", error.message);
        throw error;
    }
}

async function editarUsuario ( id, nome, data_criacao ){
    
    let usuario = new Usuario(null, nome, data_criacao);
    usuario.id = id;

    try {
        await atualizarUsuario( usuario ); 
    } catch (error) {
        console.error ( "Erro ao atualizar usuário: ", error.message);
        throw error;
    }
    
}

async function removerUsuario ( id ){

    try {
        await deletarUsuario( id );
    } catch ( error ){
        console.error ( "Erro ao remover usuário: ", error.message);
        throw error;
    }

}

module.exports = { criarUsuario, buscarPorId, listarUsuarios, editarUsuario, removerUsuario };
