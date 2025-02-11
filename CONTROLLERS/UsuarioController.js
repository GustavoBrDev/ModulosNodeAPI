const { criarUsuario, buscarPorId, listarUsuarios, editarUsuario, removerUsuario } = require('../SERVICES/UsuarioService');


const criar = async (req, res) => {
    const { nome, data_criacao } = req.body;

    try {
        await criarUsuario(nome, data_criacao);
        res.status(200).json("Usuário adicionado");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obterPorId = async ( req, res ) => {
    const { id } = req.params;

    try {
        const usuario = await buscarPorId(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const listar = async ( req, res ) => {
    try {
        const lista = await listarUsuarios();
        res.status(200).json(lista);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const atualizar = async ( req, res ) => {
    const {id} = req.params;
    const {nome, data_criacao } = req.body;

    try {
        await editarUsuario ( id, nome, data_criacao );
        res.status(200).json("Usuário atualizado");
    } catch ( error ){
        res.status(400).json( { error: error.message } );
    }
}

const deletar = async ( req, res ) => {
    const {id} = req.params;

    try {
        await removerUsuario ( id );
        res.status(200).json("Usuário removido");
    } catch ( error ){    
        res.status(400).json( { error: error.message } );
    }
    
}

module.exports = { criar, obterPorId, listar, atualizar, deletar };