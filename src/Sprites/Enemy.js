class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {

        //setup parent class
        super(scene, x, y, texture);
        scene.add.existing(this);
    }
}