const axios = require("axios");
module.exports={

    get:async function(codeStudent){
        const {data} = await axios.get("http://usuarios_api:81/usuario/"+codeStudent);
        return data[0]; 
    }
}