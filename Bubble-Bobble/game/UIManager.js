import { datosIniciales } from "./Setup.js";

export class UIManager{

    static create(scene){

        scene.add.bitmapText(
            50,
            15,
            'pixel',
            'Lives',
            14
        ).setOrigin(.5);

        scene.lives = datosIniciales ? datosIniciales.lives : 3;

        scene.lifeDisplay = scene.add.group({

            key:'head',

            repeat:scene.lives-1,

            setXY:{
                x:25,
                y:50,
                stepX:25
            }

        });

        scene.textScore = scene.add.bitmapText(
            50,
            75,
            'pixel',
            'Score',
            14
        ).setOrigin(.5);

        scene.startScore = datosIniciales ? datosIniciales.score : 0;
        scene.score = scene.startScore;

        scene.scoreText = scene.add.bitmapText(
            50,
            97,
            'pixel',
            String(scene.score),
            16
        ).setOrigin(.5);

    }

}