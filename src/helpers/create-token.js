import jwt from 'jsonwebtoken'

const createUserToken = async (user,req,res)=>{
    const token = jwt.sign({
        name:user.name,
        id:user.id
    },'hojefezsol')

    return token
}

export default createUserToken