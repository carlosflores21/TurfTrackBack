const axios = require("axios");
module.exports={

    get:async function(id_usuario){
        const {data} = await axios.get("http://usuarios_api:81/usuario/"+id_usuario);
        return data[0]; 
    }
}