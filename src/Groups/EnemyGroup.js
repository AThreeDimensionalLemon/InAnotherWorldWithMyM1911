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
        scene.physics.add.collider(this, player, (player, enemy) => { //TODO: Figure out what determines which object is the first argument
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