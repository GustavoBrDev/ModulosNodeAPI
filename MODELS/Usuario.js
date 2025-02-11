class Usuario {
    
    constructor( id = null, nome, data_criacao) {
        this.id = id;
        this.nome = nome;
        this.data_criacao = data_criacao;
    }

};

module.exports = Usuario;