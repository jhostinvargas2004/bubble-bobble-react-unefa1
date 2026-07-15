import config from "./config.js";
class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite){
        super(scene,x, y, sprite, 0);

        this.dir = -1;
        this.speed = 100;
        this.jumpDelay = 2000 + Math.floor(Math.random() * 5000);
        this.lifespan = 0;
        this.paused = false;
    }

    spawn(){

        this.setScale(2.5);
        this.anims.play(this.texture.key);
        this.body.setCircle(7, 1, 1.5);

        if(Math.round(Math.random())){
            this.changeDir()
        }
    }

    changeDir(){

        this.dir *= -1;

        if(this.dir === 1)
            this.flipX = true;
        else
            this.flipX = false;

    }

    jump(){

        this.body.setVelocityY(
            -this.scene.physicsConfig.player.jumpForce
        );

    }

    pause(){

        if(!this.paused){

            this.paused = true;
            this.body.enable = false;
            this.anims.pause();
            this.setFrame(0);

        }

    }

    resume(){

        if(this.paused){

            this.paused = false;
            this.setScale(2.5);
            this.body.enable = true;
            this.anims.resume();

        }

    }

    update(_, dt){

        if(this.paused) return;


        if(this.body.velocity.y > 0){

            this.body.setVelocityX(0);

        }else{

            this.body.setVelocityX(this.dir * this.speed);

        }

        if(this.jumpDelay <= 0 && this.body.onFloor()){

            this.jump();
            this.jumpDelay = 2000 + Math.floor(Math.random() * 5000);

        }else{

            this.jumpDelay -= dt;

        }

        if(this.y > 620){

            this.y = -20;

        }

        this.lifespan += dt;

        if(this.x < 100 || this.x > 700){

            if(this.scene.gameRunning){

                this.destroy();


                if(
                    this.scene.enemies.getChildren().length === 0 &&
                    this.scene.gameRunning
                ){

                    this.scene.gameRunning = false;

                    this.scene.time.delayedCall(
                        2000,
                        function(){

                            this.scene.nextLevel();

                        },
                        [],
                        this.scene
                    );

                }

            }

        }

    }

}

export default Enemy;