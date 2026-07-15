const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// POST /api/usuarios — Registrar nuevo usuario
router.post('/', async (req, res) => {
  const { user_alias } = req.body;

  if (!user_alias || user_alias.trim() === '') {
    return res.status(400).json({ error: 'El alias es obligatorio' });
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO users (user_alias) VALUES ($1) RETURNING user_id, user_alias',
      [user_alias]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'El alias ya está registrado' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// GET /api/usuarios/:alias — Verificar si existe
router.get('/:alias', async (req, res) => {
  const { alias } = req.params;

  try {
    const resultado = await pool.query(
      'SELECT user_id, user_alias FROM users WHERE user_alias = $1',
      [alias]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ existe: false, error: 'Usuario no encontrado' });
    }

    res.json({ existe: true, ...resultado.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al verificar usuario' });
  }
});

module.exports = router;