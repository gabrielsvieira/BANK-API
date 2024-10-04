const {
    contas,
    depositos,
    saques,
    transferencias,

} = require("../database/database");
const {format} = require("date-fns");
const analisarValor = require("../utils/analisaCampoValor");
const localizar_Conta = require("../utils/localizarConta");
const{
    verificaSenha,
    verificaSaldoSuficiente,
    verificaTransferenciaMesmaConta,
} = require("../servicos/verificaSenha&Saldo");

const depositar = (req, res) => {
    const {numero_conta, valor}= req.body;

    try{
        analisarValor(valor);
        const dataHoraFormatada = format(new Date(), "dd-MM-yyyy HH:mm:ss");

        const procurar = localizar_Conta(contas, numero_conta);
        const contaEncontrada = contas[procurar];

        depositos.push({
            numero_conta,
            valor,
            data: dataHoraFormatada,
        });

        contaEncontrada.saldo += valor;
    } catch (error){
        res.status(400).json({mensagem: error.message});
    }
}

const saque = (req, res) =>{
    const {numero_conta, valor, senha} = req.body;

    try{
        const localizar_Conta = localizar_Conta(contas, numero_conta);
        const contaEncontrada = contas[localizar_Conta];

        verificaSenha(senha, contaEncontrada);
        verificaSaldoSuficiente(valor, contaEncontrada);

        const novoSaldo = contaEncontrada.saldo - valor;
        contaEncontrada.saldo = novoSaldo;

        const dataHoraFormatada = format(new Date(), "dd-MM-yyyy  HH:mm:ss");

        saques.push({
            data: dataHoraFormatada,
            numero_conta,
            valor,
        })
    } catch (error) {
        res.status(404).json({ mensagem: error.message });
      }
}

const transferencia = (req, res) =>{
    const { numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    try{
        const localizarContaOrigem = localizar_Conta(contas, numero_conta_origem);
        const localizarContaDestino = localizar_Conta(contas, numero_conta_destino);

        const contaOrigemEncontrada = contas[localizarContaOrigem];
        const contaDestinoEncontrada= conta[localizarContaDestino];


        verificarSenha(senha, contaOrigemEncontrada);
        verificaSaldoSuficiente(valor, contaOrigemEncontrada);
        verificaTransferenciaMesmaConta(numero_conta_origem, numero_conta_destino);

        const dataHoraFormatada = format(new Date(), "dd-MM-yyyy HH:mm:ss");

        transferencias.push({
            dataHoraFormatada,
            numero_conta_destino,  
            numero_conta_origem,
            valor,
        })
        contaDestinoEncontrada.saldo += valor;
    const atualizarSaldo = contaOrigemEncontrada.saldo - valor;
    contaOrigemEncontrada.saldo = atualizarSaldo;

    return res.status(200).json();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = { depositar, saque, transferencia };
    
