import config from "./config.js";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'dino', 0);
        this.scene.events.on('update', this.update, this);
        this.lifetime = 0;
        this.cooldown = 0; 
        this.canshoot = false;
    }

    spawn(){
        this.setScale(1.6);
        this.body.setCircle(12, 13, 10);
        this.anims.play('idle');
    }
    
    update(_, dt){
        if(this.input === undefined || this.input === null) return;
        
        if(Phaser.Input.Keyboard.JustDown(this.input.attack) && this.cooldown <= 0 && this.canshoot){
            if(this.anims.currentAnim.key !== 'attack') this.play('attack');

            var proj = this.scene.projectiles.get(this.x, this.y, 0);

            if(proj !== null){
                proj.fire(this);
                this.cooldown = 500;
            }
        }

        if(this.input.left.isDown){

            if(this.anims.currentAnim.key !== 'walk' && this.input.attack.isUp) 
                this.play('walk');

            if(this.flipX) 
                this.flipX = false;

            this.body.setVelocityX(-config.physics.player.moveSpeed);

        }else if(this.input.right.isDown){

            if(this.anims.currentAnim.key !== 'walk' && this.input.attack.isUp) 
                this.play('walk');

            if(!this.flipX) 
                this.flipX = true;

            this.body.setVelocityX(config.physics.player.moveSpeed);
        }


        if(this.input.jump.isDown && this.body.onFloor()){

            this.body.setVelocityY(-config.physics.player.jumpForce);

            this.play('jump');

            this.scene.sounds.jump.play();
        }

        if(this.input.left.isUp && this.input.right.isUp){

            if(
                this.anims.currentAnim.key !== 'idle' &&
                this.input.attack.isUp &&
                this.body.velocity.y >= 0
            ){
                this.play('idle');
            }

            this.body.setVelocityX(0);
        }

        if(this.y > 620){
            this.y = -20;
        }


        if(this.cooldown > 0){
            this.cooldown -= dt;
        }

        if(this.x < 100 || this.x > 700){

            if(this.scene.gameRunning) 
                this.scene.loseLife();

        }
    }
}

export default Player;