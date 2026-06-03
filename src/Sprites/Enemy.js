class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {

        //setup parent class
        super(scene, x, y, texture);
        scene.add.existing(this);
    }

    start() {
        this.active = true;
        this.visible = true;
        this.body.checkCollision.none = false;
    }

    stop() {
        this.active = false;
        this.visible = false;
        this.body.checkCollision.none = true;
    }
}