import userExist from "../service/userExists.js";
import AuthService from "../service/authenticationService.js";


const authService = new AuthService()

class authController {

   static login = async (req, res) =>{
        
        try {
            
            const { email, password } = req.body   
            
            if(await userExist(email)){
                const login = await authService.login({email,password})
                res.status(200).json({ message: 'Usuario logado com sucesso.', login})
            }else{
                throw new Error()
            }

            
        } catch (error) {
            res.status(401).json({ message: `${error.message} - Usuario ou senha incorretos.`});
        }
    }
    
  }

export default authController