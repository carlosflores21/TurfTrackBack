const axios = require("axios");

module.exports = {
    // Obtener la información de un usuario por su id
    getUsuarioByid: async function(id_usuario) {
        try {
            const response = await axios.get(`http://usuarios_api:81/usuario/${id_usuario}`);
            return response.data[0]; 
        } catch (error) {
            console.error(`Error al obtener usuario con id ${id_usuario}:`, error);
            throw error;
        }
    },

    // Método para agregar un usuario
    addUsuario: async function(usuarioData) {
        try {
            // Validar que los datos cumplan con el esquema de usuario antes de enviar
            if (!usuarioData.id_usuario || !usuarioData.nombre || !usuarioData.email || !usuarioData.telefono || !usuarioData.contrasena) {
                throw new Error('Faltan campos requeridos en usuarioData');
            }

            const response = await axios.post("http://usuarios_api:81/usuario", usuarioData);
            return response.data;
        } catch (error) {
            console.error("Error al agregar un nuevo usuario:", error);
            throw error;
        }
    },

    // Método para editar un usuario
    updateUsuario: async function(id_usuario, usuarioData) {
        try {
            // Validar que los datos cumplan con el esquema de usuario antes de enviar
            if (!usuarioData.nombre || !usuarioData.email || !usuarioData.telefono || !usuarioData.contrasena) {
                throw new Error('Faltan campos requeridos en usuarioData');
            }

            const response = await axios.put(`http://usuarios_api:81/usuario/${id_usuario}`, usuarioData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar usuario con id ${id_usuario}:`, error);
            throw error;
        }
    },

    // Método para eliminar un usuario
    deleteUsuario: async function(id_usuario) {
        try {
            const response = await axios.delete(`http://usuarios_api:81/usuario/${id_usuario}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar usuario con id ${id_usuario}:`, error);
            throw error;
        }
    }
};
