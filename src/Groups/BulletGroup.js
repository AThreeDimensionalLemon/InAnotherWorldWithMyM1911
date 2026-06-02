class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {

        //setup parent class
        super(scene.physics.world, scene, {
            key: "sprite_bullet",
            classType: Bullet,
            max: 20
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}