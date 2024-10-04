const verificaSenha = (senha, conta) => {
    if (conta.usuario.senha !== senha) {
        throw new Error ("Senha Incorreta");
    }
}

const verificaSaldoSuficiente = (valor, conta) =>{
    if (conta.saldo < valor){
        throw new Error ("Saldo Insuficiente");
    }
}

const verificaTransferenciaMesmaConta = (
    numeroContaOrigem,
    numeroContaDestino
) => {
    if (numeroContaOrigem === numeroContaDestino){
        throw new Error("Não é possivel transferir para a mesma conta");

    }
}

module.exports = {
    verificaSenha,
    verificaSaldoSuficiente,
    verificaTransferenciaMesmaConta,
  };