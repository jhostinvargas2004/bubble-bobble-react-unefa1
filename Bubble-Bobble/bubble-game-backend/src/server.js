require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./database/db');
const usuariosRoutes = require('./routes/usuarios.routes');
const partidasRoutes = require('./routes/partidas.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/partidas', partidasRoutes);

// Ruta de prueba para verificar que la conexión a la BD funciona
app.get('/api/test', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');
    res.json({ mensaje: 'Conexión exitosa', hora_servidor: resultado.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al conectar con la base de datos' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});