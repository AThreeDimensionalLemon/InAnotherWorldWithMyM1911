class EnemyGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {

        //setup parent class
        super(scene.physics.world, scene, {
            key: "sprite_enemy",
            classType: Enemy
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}