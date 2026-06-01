//TODO: Make this class extend a sprite with a physics body
class Player {
    constructor(inSprite) {
        this.sprite = inSprite;

        //configs
        //TODO: Make this object read from a JSON
        this.configs = {
            moveSpeed: 75,
            maxShootCooldown: 500
        }

        //architecture
        this.inputs = this.sprite.scene.input.keyboard.addKeys("W,A,S,D,UP,LEFT,RIGHT,DOWN");
    }

    GetDirection(left, right, up, down) {
        const xSum = Number(right) - Number(left);
        const ySum = Number(down) - Number(up);
        if (left != right && up != down) return { //going diagonal
            x: xSum / Math.sqrt(2),
            y: ySum / Math.sqrt(2)
        };
        else return { //going straight
            x: xSum,
            y: ySum
        };
        
    }

    update(time, delta) {

        //poll inputs
        const moveDirection = this.GetDirection(this.inputs.A.isDown, this.inputs.D.isDown, this.inputs.W.isDown, this.inputs.S.isDown);
        this.sprite.body.setVelocityX(moveDirection.x * this.configs.moveSpeed);
        this.sprite.body.setVelocityY(moveDirection.y * this.configs.moveSpeed);
        console.log(this.sprite.body.velocity);
    }
}