import { registrarUsuario, iniciarNuevoJuego, obtenerPartidaGuardada, guardarPartida } from './api.js';
import { game, iniciarJuego, destruirJuego } from './game/Setup.js';

const pantallaMenu = document.getElementById('pantalla-menu');
const pantallaAlias = document.getElementById('pantalla-alias');
const contenedorJuego = document.getElementById('contenedor-juego');
const menuPausa = document.getElementById('menu-pausa');

const tituloAlias = document.getElementById('titulo-alias');
const inputAlias = document.getElementById('input-alias');
const errorAlias = document.getElementById('error-alias');
const botonConfirmar = document.getElementById('boton-confirmar');
const mensajePausa = document.getElementById('mensaje-pausa');

let aliasActual = null;
let vistaActual = null;

function mostrarPantalla(pantalla) {
  pantallaMenu.classList.add('oculto');
  pantallaAlias.classList.add('oculto');
  contenedorJuego.classList.add('oculto');
  pantalla.classList.remove('oculto');
}

function abrirFormularioAlias(vista, titulo) {
  vistaActual = vista;
  tituloAlias.textContent = titulo;
  inputAlias.value = '';
  errorAlias.textContent = '';
  mostrarPantalla(pantallaAlias);
}

document.getElementById('boton-nuevo-jugador').addEventListener('click', () => abrirFormularioAlias('nuevo-jugador', 'Registrar nuevo jugador'));
document.getElementById('boton-nuevo-juego').addEventListener('click', () => abrirFormularioAlias('nuevo-juego', 'Iniciar nuevo juego'));
document.getElementById('boton-retomar').addEventListener('click', () => abrirFormularioAlias('retomar', 'Retomar partida'));
document.getElementById('boton-volver').addEventListener('click', () => mostrarPantalla(pantallaMenu));

botonConfirmar.addEventListener('click', async () => {
  const alias = inputAlias.value.trim();
  if (!alias) return;

  errorAlias.textContent = '';
  botonConfirmar.disabled = true;
  botonConfirmar.textContent = 'Cargando...';

  try {
    let datos;
    if (vistaActual === 'nuevo-jugador') {
      await registrarUsuario(alias);
      datos = { level: 1, score: 0, lives: 3 };
    } else if (vistaActual === 'nuevo-juego') {
      datos = await iniciarNuevoJuego(alias);
    } else if (vistaActual === 'retomar') {
      datos = await obtenerPartidaGuardada(alias);
    }

    aliasActual = alias;
    mostrarPantalla(contenedorJuego);
    iniciarJuego({
      alias: aliasActual,
      level: datos.level,
      score: datos.score,
      lives: datos.lives,
    });
  } catch (err) {
    errorAlias.textContent = err.message;
  } finally {
    botonConfirmar.disabled = false;
    botonConfirmar.textContent = 'Confirmar';
  }
});

document.addEventListener('contextmenu', (evento) => {
  if (contenedorJuego.classList.contains('oculto')) return;
  evento.preventDefault();
  mensajePausa.textContent = '';
  menuPausa.classList.remove('oculto');
  if (game) game.scene.pause('Game');
});

document.getElementById('boton-continuar').addEventListener('click', () => {
  menuPausa.classList.add('oculto');
  if (game) game.scene.resume('Game');
});

document.getElementById('boton-guardar').addEventListener('click', async () => {
  const escena = game.scene.keys.Game;
  mensajePausa.textContent = 'Guardando...';
  try {
    await guardarPartida(aliasActual, escena.currentLevel, escena.score, escena.lives);
    mensajePausa.textContent = 'Partida guardada correctamente';
  } catch (err) {
    mensajePausa.textContent = err.message;
  }
});

function volverAlMenu() {
  destruirJuego();
  contenedorJuego.innerHTML = '';
  menuPausa.classList.add('oculto');
  mostrarPantalla(pantallaMenu);
}

document.getElementById('boton-salir').addEventListener('click', volverAlMenu);

window.addEventListener('bb-fin-partida', volverAlMenu);