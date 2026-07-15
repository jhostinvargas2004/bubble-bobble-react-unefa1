import { CollisionManager } from "./CollisionManager.js";

export class LevelManager {

    static loadLevel(scene, key) {
        if (scene.currLevel !== undefined) {
            let goaway = scene.tweens.add({
                targets: scene.currLevel,
                y: '-=700',
                duration: 2000,
            });

            LevelManager.clearEntities(scene);
        }

        if (scene.currentLevel > scene.levels) {

            if (scene.lives === 0) {
                scene.add.bitmapText(400, 100, 'pixel', 'Game Over').setOrigin(.5, .5);
                scene.sounds.lose.play();
            } else {
                scene.add.bitmapText(400, 100, 'pixel', 'You Win').setOrigin(.5, .5);
                scene.sounds.win.play();
            }

            scene.time.delayedCall(5000, function () {
                window.dispatchEvent(new CustomEvent('bb-fin-partida'));
            }, [], scene);

        } else {

            scene.startScore = scene.score;

            scene.level = scene.make.tilemap({ key: key });

            let tiles = scene.level.addTilesetImage('tiles', 'tiles');

            scene.solidLayer = scene.level.createStaticLayer(0, tiles, 100, 700);
            scene.platformsLayer = scene.level.createStaticLayer(1, tiles, 100, 700);
            scene.enemyReverseLayer = scene.level.createStaticLayer(2, tiles, 100, 700);
            scene.enemySolidLayer = scene.level.createStaticLayer(3, tiles, 100, 700);
            scene.solidLayer.setScale(3);
            scene.platformsLayer.setScale(3);
            scene.enemyReverseLayer.setScale(3);
            scene.enemySolidLayer.setScale(3);
            scene.solidLayer.setCollisionByExclusion([-1], true);
            scene.platformsLayer.setCollisionByExclusion([-1], true);
            scene.enemyReverseLayer.setCollisionByExclusion([-1], true);
            scene.enemySolidLayer.setCollisionByExclusion([-1], true);

            scene.currLevel = [
                scene.solidLayer,
                scene.platformsLayer,
                scene.enemyReverseLayer,
                scene.enemySolidLayer
            ];

            let tween = scene.tweens.add({
                targets: scene.currLevel,
                y: '-=700',
                duration: 2000,
            });

            tween.setCallback('onComplete', function () {
                LevelManager.spawnEntities(scene);
            }, [], scene);
        }
    }

    static clearEntities(scene) {

        scene.enemies.clear(true, true);
        scene.projectiles.clear(true, true);
        scene.pickups.clear(true, true);

        scene.bubbles.getChildren().forEach(function (child) {
            if (child.caught !== null) {
                child.caught.destroy();
            }
        });

        scene.bubbles.clear(true, true);
        scene.player.destroy();
    }

    static spawnEntities(scene) {

        let enemyPoints = scene.level.createFromObjects('EnemySpawn', 1, {
            key: 'apple',
            frame: 1
        });

        enemyPoints.forEach(function (element) {

            element.setScale(3);
            element.x *= 3;
            element.x += 100;
            element.y *= 3;

            scene.createEnemy(element.x, element.y);

        });

        let playerPoint = scene.level.createFromObjects('PlayerSpawn', 1, {
            key: 'apple',
            frame: 1
        })[0];

        playerPoint.setScale(3);
        playerPoint.x *= 3;
        playerPoint.x += 100;
        playerPoint.y *= 3;

        scene.createPlayer(playerPoint.x, playerPoint.y);

        CollisionManager.setup(scene);
        scene.player.visible = true;
    }

}