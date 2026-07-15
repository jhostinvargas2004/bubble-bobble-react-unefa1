export class AssetLoader {
    static preload(scene) {

        scene.load.audio('theme', [
            'fronted/audio/theme.ogg',
            'fronted/audio/theme.mp3'
        ]);

        scene.load.audio('win', [
            'fronted/audio/win.ogg',
            'fronted/audio/win.mp3'
        ]);

        scene.load.audio('lose', [
            'fronted/audio/lose.ogg',
            'fronted/audio/lose.mp3'
        ]);

        scene.load.audio('death', [
            'fronted/audio/death.wav'
        ]);

        scene.load.audio('pickup', [
            'fronted/audio/pickup.ogg',
            'fronted/audio/pickup.mp3'
        ]);

        scene.load.audio('jump', [
            'fronted/audio/jump.ogg',
            'fronted/audio/jump.mp3'
        ]);

        scene.load.audio('bubble', [
            'fronted/audio/bubble.ogg',
            'fronted/audio/bubble.mp3'
        ]);

        scene.load.audio('hit', [
            'fronted/audio/hit.ogg',
            'fronted/audio/hit.mp3'
        ]);

        scene.load.bitmapFont(
            'pixel',
            'fronted/Pixel Emulator.png',
            'fronted/Pixel Emulator.fnt'
        );


        scene.load.spritesheet(
            'dino', 
            'fronted/sprites/spritesheet.png', 
            {
            frameWidth: 48,
            frameHeight: 48
            }
        );


        scene.load.spritesheet(
            'bubble',
            'fronted/sprites/bubbles.png',
            {
                frameWidth:16,
                frameHeight:16
            }
        );


        scene.load.spritesheet(
            'bullet',
            'fronted/sprites/bullets.png',
            {
                frameWidth:10,
                frameHeight:10
            }
        );


        scene.load.spritesheet(
            'clockworker',
            'fronted/sprites/clockworker.png',
            {
                frameWidth:16,
                frameHeight:16
            }
        );


        scene.load.spritesheet(
            'apple',
            'fronted/sprites/apple.png',
            {
                frameWidth:16,
                frameHeight:15
            }
        );


        scene.load.image(
            'head',
            'fronted/sprites/head.png'
        );


        scene.load.image(
            'tiles',
            'fronted/sprites/tiles.png'
        );

        scene.load.tilemapTiledJSON(
            'level1',
            'fronted/maps/level1.json'
        );

        scene.load.tilemapTiledJSON(
            'level2',
            'fronted/maps/level2.json'
        );

        scene.load.tilemapTiledJSON(
            'level3',
            'fronted/maps/level3.json'
        );

        scene.load.tilemapTiledJSON(
            'level4',
            'fronted/maps/level4.json'
        );


        scene.levels = 4;
    }
}