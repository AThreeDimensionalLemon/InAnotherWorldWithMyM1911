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
        this.active = true;
        this.visible = true;
        this.body.setVelocity(xDirection * this.configs.moveSpeed, yDirection * this.configs.moveSpeed);
        this.body.checkCollision.none = false;
        this.setRotation(Math.atan(xDirection / yDirection)); //TODO: Fix this facing the wrong direction when going diagonal
    }

    stop() {
        this.active = false;
        this.visible = false;
        this.body.stop();
        this.body.checkCollision.none = true;
    }
}