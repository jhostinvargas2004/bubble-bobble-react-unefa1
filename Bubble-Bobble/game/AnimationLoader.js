export class AnimationLoader{

    static create(scene){

        if(!scene.anims.get('idle')){

            scene.anims.create({
                key: 'idle',
                frames: scene.anims.generateFrameNumbers('dino', { start: 1, end: 2 }),
                frameRate: 4, 
                repeat: -1,
            });

            scene.anims.create({
                key: 'walk',
                frames: scene.anims.generateFrameNumbers('dino', { start: 4, end: 5 }),
                frameRate: 6,
                repeat: -1,
            });

            scene.anims.create({
                key: 'attack',
                frames: scene.anims.generateFrameNumbers('dino', { start: 0, end: 0 }),
                frameRate: 0,
                repeat: 0,
            });

            scene.anims.create({
                key: 'jump',
                frames: scene.anims.generateFrameNumbers('dino', { start: 5, end: 5 }),
                frameRate: 0,
                repeat: -1,
            });

            scene.anims.create({
                key: 'clockworker',
                frames: scene.anims.generateFrameNumbers('clockworker', { start:0, end:1}),
                frameRate:4,
                repeat:-1,
            });


            scene.anims.create({
                key:'applebye',
                frames: scene.anims.generateFrameNumbers('apple',{start:0,end:1}),
                frameRate:4,
                repeat:-1,
            });

        }

    }

}