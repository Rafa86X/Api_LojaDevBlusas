import usuario from "../models/Usuario.js";
 const userExist = async (email)=>{

    const itensResp = await usuario.find({email});
    

    if(itensResp.length != 0)
        return true;
    else
        return false;
    
}

export default userExist
