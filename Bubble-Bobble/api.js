const API_BASE_URL = 'http://localhost:4000/api';

async function manejarRespuesta(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Ocurrió un error inesperado');
  }
  return data;
}

export async function registrarUsuario(alias) {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_alias: alias }),
  });
  return manejarRespuesta(response);
}

export async function iniciarNuevoJuego(alias) {
  const response = await fetch(`${API_BASE_URL}/partidas/nuevo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_alias: alias }),
  });
  return manejarRespuesta(response);
}

export async function obtenerPartidaGuardada(alias) {
  const response = await fetch(`${API_BASE_URL}/partidas/${alias}`);
  return manejarRespuesta(response);
}

export async function guardarPartida(alias, nivel, puntuacion, vidas) {
  const response = await fetch(`${API_BASE_URL}/partidas/guardar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_alias: alias,
      level: nivel,
      score: puntuacion,
      lives: vidas,
    }),
  });
  return manejarRespuesta(response);
}