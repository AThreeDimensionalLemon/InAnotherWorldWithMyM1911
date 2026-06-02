class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {

        //setup parent class
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            moveSpeed: 75
        }
    }
}