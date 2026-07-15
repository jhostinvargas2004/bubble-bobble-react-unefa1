import config from "./config.js";
import Game from "./Game.js";


config.scene = [Game];


const game = new Phaser.Game(config);