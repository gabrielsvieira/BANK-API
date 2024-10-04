const senhaCentral = (req, res, next) => {
    const {senha_banco} = req.query;


    if(!senha_banco){
        return res.status(401).send("Não Autorizado");
    }

    if(senha_banco !== "@2024"){
        return res.status(401).send("A senha do banco informada é invalida!");
    }

    next();
}

module.exports = senhaCentral;