class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {

        //setup parent class
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            moveSpeed: 150
        }
    }

    start(xDirection, yDirection) {
        this.setActive(true);
        this.setRotation(Math.atan(xDirection / yDirection)); //TODO: Fix this facing the wrong direction when going diagonal
        this.body.setVelocity(xDirection * this.configs.moveSpeed, yDirection * this.configs.moveSpeed);
    }
}