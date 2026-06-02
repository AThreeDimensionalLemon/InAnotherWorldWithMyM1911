class EnemyGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {

        //setup parent class
        super(scene.physics.world, scene, {
            key: "sprite_enemy",
            classType: Enemy
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);

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