class Player extends Phaser.Physics.Arcade.Body {
    constructor(scene, x, y, texture) {
        super(scene.physics.world, scene.add.sprite(x, y, texture));
    }
}