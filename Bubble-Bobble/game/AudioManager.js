export class AudioManager{

    static create(scene){

        scene.sounds = {

            bubble: scene.sound.add('bubble',{volume:.5}),
            win: scene.sound.add('win',{volume:.2}),
            lose: scene.sound.add('lose',{volume:.2}),
            pickup: scene.sound.add('pickup',{volume:.3}),
            jump: scene.sound.add('jump',{volume:.2}),
            hit: scene.sound.add('hit',{volume:.5}),
            death: scene.sound.add('death',{volume:.5})

        };

    }

}