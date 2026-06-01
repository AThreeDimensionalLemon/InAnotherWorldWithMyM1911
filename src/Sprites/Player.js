//TODO: Make this class extend a sprite with a physics body
class Player {
    constructor(inSprite) {

        //configs
        //TODO: Make this object read from a JSON
        this.configs = {
            moveSpeed: 75,
            maxShootCooldown: 500
        }

        //architecture
        this.sprite = inSprite;
        this.inputs = inSprite.scene.input.keyboard.addKeys("W,A,S,D,UP,LEFT,RIGHT,DOWN");
    }

    GetDirection(left, right, up, down) {
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
        const moveDirection = this.GetDirection(this.inputs.A.isDown, this.inputs.D.isDown, this.inputs.W.isDown, this.inputs.S.isDown);
        this.sprite.body.setVelocityX(moveDirection.x * this.configs.moveSpeed);
        this.sprite.body.setVelocityY(moveDirection.y * this.configs.moveSpeed);
        const fireDirection = this.GetDirection(this.inputs.LEFT.isDown, this.inputs.RIGHT.isDown, this.inputs.UP.isDown, this.inputs.DOWN.isDown);
    }
}