import funcionario from "../models/funcionario.js";
 const userExist = async (email)=>{

    const itensResp = await funcionario.find({email});
    

    if(itensResp.length != 0)
        return true;
    else
        return false;
    
}

export default userExist
