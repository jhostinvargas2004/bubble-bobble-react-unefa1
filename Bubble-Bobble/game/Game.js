import Player from "./Player.js";
import config from "./config.js";
import Enemy from "./Enemy.js";
import Bubble from "./Bubble.js";
import Projectile from "./Projectile.js";
import Pickup from "./Pickup.js";

import {AssetLoader} from "./AssetLoader.js";
import {AnimationLoader} from "./AnimationLoader.js";
import {AudioManager} from "./AudioManager.js";
import {UIManager} from "./UIManager.js";
import {LevelManager} from "./LevelManager.js";

var music;
class Game extends Phaser.Scene {
    constructor() {
        super({key: "Game"});
    }

preload(){

    AssetLoader.preload(this);

}
    
    create(){
        this.physicsConfig = config.physics;
        this.startScore = 0;
        this.currentLevel = 1;
        this.gameRunning = false;
        AnimationLoader.create(this);
        AudioManager.create(this);
        UIManager.create(this);
        this.projectiles = this.physics.add.group({
            classType: Projectile,
            maxSize: 10,
        });
        this.enemies = this.physics.add.group({
            classType: Enemy,
            maxSize: 20,
            runChildUpdate: true,
        });
        this.bubbles = this.physics.add.group({
            classType: Bubble,
            maxSize: 10,
            runChildUpdate: true,
        });
        this.pickups = this.physics.add.group({
            classType: Pickup,
            maxSize: 10,
            runChildUpdate: true,
        });
        LevelManager.loadLevel(this,'level' + this.currentLevel);

        if(music === undefined){ 
            music = this.sound.add('theme', {
                loop: true
            });
            music.play();
        }
    }
    update(_, dt){
    }

    addScore(amount){
        this.score += amount;
        this.scoreText.setText(this.score);
        this.sounds.pickup.play();
    }

    loseLife(){
        this.gameRunning = false;
        this.sounds.death.play();
        this.rotateTween.restart();
        this.player.input = null;
        this.player.body.setVelocityX(0);

        this.cameras.main.fadeOut(500, 0, 0, 0, function(){}, this);
        this.time.delayedCall(500, function(){

            this.score = this.startScore;
            this.scoreText.setText(this.score);

            this.lives -= 1;
            this.lifeDisplay.getChildren()[this.lifeDisplay.getChildren().length-1].destroy();

            if(this.lives > 0){

                LevelManager.clearEntities(this);
                LevelManager.spawnEntities(this);
            }else{

                this.currentLevel = 50000;
                LevelManager.loadLevel(this, '');
            }

            this.cameras.main.fadeIn(1000, 0, 0, 0);
        }, [], this);
    }

    createPlayer(spawnX, spawnY){
        let bub = this.add.sprite(400, -50, 'bubble', 0).setScale(3);
        let dino = this.add.sprite(400, -50, 'dino', 0).setScale(1.7);

        let tween = this.tweens.add({
            targets: [bub, dino],
            x: spawnX,
            y: spawnY,
            duration: 2000,
        });
        tween.setCallback('onComplete', function(){
            bub.destroy();
            dino.destroy();
            let bubblepop = this.add.sprite(spawnX, spawnY, 'bubble', 3).setScale(3);
            this.time.delayedCall(200, function(){bubblepop.destroy()}, [], this);

            this.player.x = spawnX;
            this.player.y = spawnY;
			this.player.canshoot = true;
            this.add.existing(this.player);
            this.gameRunning = true; 
        }, [], this);

        this.player = new Player(this, spawnX, spawnY);
        this.physics.world.enable(this.player);
        this.player.spawn();
        this.player.input = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.W,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        let rotate = this.tweens.add({
            targets: this.player,
            angle: {
              getStart: function(target, key, value) {
                return 0;
              },
              getEnd: function(target, key, value) {
                if(target.flipX) {
                  return -720;
                } else {
                  return 720;  
                }
                
              }
            },
            duration: 2000,
            paused: true,
            repeat: -1
        });
        this.rotateTween = rotate;
    }

    createEnemy(spawnX, spawnY){
        let bub = this.add.sprite(400, -50, 'bubble', 0).setScale(3);
        let enemySpr = this.add.sprite(400, -50, 'clockworker', 0).setScale(2.5*0.8);

        let tween = this.tweens.add({
            targets: [bub, enemySpr],
            x: spawnX,
            y: spawnY,
            duration: 2000,
        });
        tween.setCallback('onComplete', function(){
            bub.destroy();
            enemySpr.destroy();
            let bubblepop = this.add.sprite(spawnX, spawnY, 'bubble', 3).setScale(3);
            this.time.delayedCall(200, function(){bubblepop.destroy()}, [], this);

            let enemy = this.enemies.get(spawnX, spawnY, 'clockworker');
            enemy.spawn();
        }, [], this);
    }

    nextLevel(){
        this.currentLevel++;
        LevelManager.loadLevel(
            this,
            'level' + this.currentLevel
        );
        this.sounds.win.play();
}

    
}
export default Game;