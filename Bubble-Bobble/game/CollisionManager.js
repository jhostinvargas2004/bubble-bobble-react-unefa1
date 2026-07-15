export class CollisionManager{

    static setup(scene){
        scene.physics.add.collider(scene.player, scene.solidLayer);
        scene.physics.add.collider(scene.player, scene.platformsLayer);

        scene.platformsLayer.forEachTile(function(tile){
            tile.collideUp = true;
            tile.collideDown = false;
            tile.collideLeft = false;
            tile.collideRight = false;
        });  

        scene.enemyReverseLayer.forEachTile(function(tile){
            tile.collideUp = false;
            tile.collideDown = false;
            tile.collideLeft = true;
            tile.collideRight = true;
        });  


        scene.physics.add.collider(
            scene.enemies,
            scene.enemyReverseLayer,
            function(enemy){
                enemy.changeDir();
            }
        );


        scene.physics.add.collider(
            scene.enemies,
            scene.enemySolidLayer
        );


        scene.physics.add.collider(
            scene.enemies,
            scene.platformsLayer
        );

        scene.physics.add.collider(
            scene.projectiles,
            scene.solidLayer,
            function(proj, ground){
                proj.hit(ground);
            },
            undefined,
            scene
        );

        scene.physics.add.collider(
            scene.projectiles,
            scene.platformsLayer,
            function(proj, ground){
                proj.hit(ground);
            },
            undefined,
            scene
        );

        scene.physics.add.collider(
            scene.projectiles,
            scene.enemies,
            function(proj, enemy){
                proj.hit(enemy);
            },
            undefined,
            scene
        );

        scene.physics.add.overlap(
            scene.player,
            scene.bubbles,
            function(player, bubble){
                bubble.pickup();
            },
            undefined,
            scene
        );

        scene.physics.add.collider(
            scene.pickups,
            scene.solidLayer
        );


        scene.physics.add.collider(
            scene.pickups,
            scene.platformsLayer
        );


        scene.physics.add.overlap(
            scene.player,
            scene.pickups,
            function(player, pickup){
                pickup.pickup();
            },
            undefined,
            scene
        );

        scene.physics.add.overlap(
            scene.player,
            scene.enemies,
            function(){
                if(scene.gameRunning) scene.loseLife();
            },
            undefined,
            scene
        );

    }

}