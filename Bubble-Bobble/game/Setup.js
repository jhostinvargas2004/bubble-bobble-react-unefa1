import config from "./config.js";
import Game from "./Game.js";

config.scene = [Game];

export let game = null;
export let datosIniciales = null;

export function iniciarJuego(datos) {
    datosIniciales = datos || null;
    if (!game) {
        game = new Phaser.Game(config);
    }
}

export function destruirJuego() {
    if (game) {
        game.destroy(true);
        game = null;
    }
}