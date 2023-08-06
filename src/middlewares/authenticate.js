import pkg from 'jsonwebtoken';
const { verify, decode } = pkg;


export async function autenticater(req, res, next) {


    
            try{
                const token = req.headers.authorization
            
                if(!token){
                    throw new Error()
                }
            
                
                const [, acssesToken] = token.split(" ")

                verify(acssesToken,process.env.SEGREDO_TOKEN)

                const { id, email } = decode(acssesToken)

                req.usuarioId = id
                req.usuarioEmail = email

              

                return next()
            }
            catch (error) {
                res.status(401).json({ message: `${error} Token invalido, ou ausência de token.` });
            }
}
