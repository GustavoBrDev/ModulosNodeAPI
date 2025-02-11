const { conectarBanco } = require('./REPOSITORY/ConexaoBanco');
conectarBanco();

const express = require('express');
const app = express();
const userRoutes = require('./ROUTES/UsuarioRoutes');
const imagemRoutes = require('./ROUTES/ImagemRoutes');

app.use(express.json());
app.use(userRoutes);
app.use(imagemRoutes);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
