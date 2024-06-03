const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

const checkToken = (req,res,next)=>{
    if(!req.headers.authorization){
        res.status(401).json({
            message: 'Erro de autenticação!'
        })
    }

    const token = getToken(req)

    if(!token){
        return res.status(401).json({
            message:'acesso negado!'
        })
    }

    try {
        const verified = jwt.verify(token,'hojefezsol')
        res.user = verified
        next()
    } catch (error) {
        return res.send(400).json({
            message: 'token inválido'
        })
    }
}
module.exports = checkToken