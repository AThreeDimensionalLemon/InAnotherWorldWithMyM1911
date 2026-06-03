//Note to self: Never use Phaser groups unless absolutely necessary
//They barely have any functionality more than a regular array and some boolean flags
//The only reason I'm using one here is because I started using one and don't want to rearchitect the entire game
class EnemyGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, player) {

        //setup parent class
        super(scene.physics.world, scene, {
            key: "sprite_enemy",
            classType: Enemy,
            quantity: -1
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, player, (enemy, player) => {
            if (enemy.active) {
                console.log("enemy attacked the player");
            }
        });

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            difficultyInterval: 30000
        }

        //gameplay variabless
        this.difficulty = 1;
    }

    update(time, delta) {

        //update variables
        this.difficulty = Math.ceil(time / this.configs.difficultyInterval)

        //spawning
    }
}