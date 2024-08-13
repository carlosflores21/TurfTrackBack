const express = require("express");
const jwt = require("jsonwebtoken");
const { usuarioModel } = require("../usuarios_api/models");

const app = express();
const port = 8080;

// Clave secreta para firmar los tokens
const secretKey = "jsonwebtokens";

app.use(express.json());

// Ruta de login usando email y contraseña
app.post("/login", async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Buscar el usuario por email
    const user = await usuarioModel.findOne({ email });

    if (user && user.contrasena === contrasena) {
      // Crear el token JWT
      const token = jwt.sign({ id_usuario: user.id_usuario, email: user.email }, secretKey, { expiresIn: "1h" });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Ejemplo de ruta protegida
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You have access to this protected route", user: req.user });
});

// Middleware para verificar el token
function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload; // Guardar la información del token en req.user
    next(); // Pasar al siguiente middleware o ruta
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
