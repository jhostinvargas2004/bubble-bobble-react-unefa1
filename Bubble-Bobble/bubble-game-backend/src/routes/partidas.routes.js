const express = require('express');
const router = express.Router();
const pool = require('../database/db');

async function buscarUsuario(alias) {
  const resultado = await pool.query(
    'SELECT user_id FROM users WHERE user_alias = $1',
    [alias.trim()]
  );
  return resultado.rows[0] || null;
}

router.post('/nuevo', async (req, res) => {
  const { user_alias } = req.body;

  if (!user_alias || user_alias.trim() === "") {
    return res.status(400).json({ error: 'El alias es obligatorio' });
  }

  try {
    const usuario = await buscarUsuario(user_alias);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no registrado' });
    }

    res.json({ level: 1, score: 0, lives: 3 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar partida nueva' });
  }
});
// GET /api/partidas/:alias — Retomar partida guardada
router.get('/:alias', async (req, res) => {
  const { alias } = req.params;
  if (!alias || alias.trim() === "") {
    return res.status(400).json({
        error: "El alias es obligatorio"
    });
}
  try {
    const resultado = await pool.query(
      `SELECT u.user_id, sg.level, sg.score, sg.lives
       FROM users u
       LEFT JOIN saved_games sg ON sg.user_id = u.user_id
       WHERE u.user_alias = $1`,
      [alias.trim()]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no registrado' });
    }

    const { level, score, lives } = resultado.rows[0];

    if (level === null) {
      return res.status(404).json({ error: 'No hay partida guardada para este usuario' });
    }

    res.json({ level, score, lives });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener partida guardada' });
  }
});

// PUT /api/partidas/guardar — Guardar/reemplazar partida
router.put('/guardar', async (req, res) => {
  const { user_alias, level, score, lives } = req.body;

  if (!user_alias ||user_alias.trim() === ""  || level == null || score == null || lives == null) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    const usuario = await buscarUsuario(user_alias);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no registrado' });
    }

    await pool.query(
      `INSERT INTO saved_games (user_id, level, score, lives)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id)
       DO UPDATE SET level = $2, score = $3, lives = $4`,
      [usuario.user_id, level, score, lives]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar partida' });
  }
});

module.exports = router;