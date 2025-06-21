const bcrypt = require ('bcrypt');
const saltRound=10;


const authFunctionality={
    async hashing(password){
        let hash = await bcrypt.hash(password,saltRound);
            return hash;
    },async check(password,hash){
        let result=await bcrypt.compare(password, hash);
        return result;
    }
}


module.exports={authFunctionality};