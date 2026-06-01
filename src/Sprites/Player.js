//TODO: Make this class extend a sprite with a physics body
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        //configs
        //TODO: Make this object read from a JSON
        this.configs = {
            moveSpeed: 25,
            maxShootCooldown: 500
        }

        //architecture
        this.inputs = scene.input.keyboard.addKeys("W,A,S,D,UP,LEFT,RIGHT,DOWN");

        //cleanup
        scene.add.existing(this);
        return this;
    }

    getCustomPhysicsCenter() {
        return {
            x: this.x,
            y: this.y
        }
    }

    getDirection(left, right, up, down) {
        const xSum = Number(right) - Number(left);
        const ySum = Number(down) - Number(up);
        if (xSum != 0 && ySum != 0) return { //moving in two axes; do diagonal correction
            x: xSum / Math.sqrt(2),
            y: ySum / Math.sqrt(2)
        };
        else return {
            x: xSum,
            y: ySum
        };
    }

    update(time, delta) {

        //poll and handle inputs
        const moveDirection = this.getDirection(this.inputs.A.isDown, this.inputs.D.isDown, this.inputs.W.isDown, this.inputs.S.isDown);
        this.x += moveDirection.x * this.configs.moveSpeed / delta;
        this.y += moveDirection.y * this.configs.moveSpeed / delta;
        const fireDirection = this.getDirection(this.inputs.LEFT.isDown, this.inputs.RIGHT.isDown, this.inputs.UP.isDown, this.inputs.DOWN.isDown);
    }
}