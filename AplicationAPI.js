const { conectarBanco, conectarAws } = require('./REPOSITORY/ConexaoBanco');
conectarBanco();
conectarAws();

const express = require('express');
const app = express();
const userRoutes = require('./ROUTES/UsuarioRoutes');
const imagemRoutes = require('./ROUTES/ImagemRoutes');
const awsRoutes = require('./ROUTES/AWSRoutes');

app.use(express.json());
app.use(userRoutes);
app.use(imagemRoutes);
app.use(awsRoutes);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
