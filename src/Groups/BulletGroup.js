class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {

        //setup parent class
        super(scene.physics.world, scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}