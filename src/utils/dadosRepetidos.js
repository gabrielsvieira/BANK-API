const { contas } = require("../database/database");

const dadosRepetidos = (cpf, email) => {
    const dadosRepetidos = contas.find((item) => {
        return item.usuario.cpf === cpf || item.usuario.email === email;
    });

    if(dadosRepetidos){
        throw new Error ("Já existe uma conta ocm o cpf ou email informado");
    }

    return false;
}

module.exports = dadosRepetidos;