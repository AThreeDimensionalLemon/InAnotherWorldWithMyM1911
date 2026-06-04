class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        //setup parent class
        super(scene, x, y, "sprite_player");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.addColliderWithMap(this);

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            moveSpeed: 75,
            shootCooldown: 375,
            damageCooldown: 1000,
            maxHealth: 3
        }

        //setup architecture
        this.inputs = scene.input.keyboard.addKeys("W,A,S,D,UP,LEFT,RIGHT,DOWN");

        //gameplay variables
        this.damageCooldown = 0;
        this.health = this.configs.maxHealth;
        this.shootCooldown = 0;
    }

    //returns direction of action for moving and shooting
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

    hurt() {
        this.health--;
        this.damageCooldown = this.configs.damageCooldown;
    }

    update(delta, bulletGroup) {

        //update variables
        if (this.shootCooldown > 0) this.shootCooldown -= delta;
        if (this.damageCooldown > 0) this.damageCooldown -= delta;
        if (this.health <= 0) this.scene.scene.start("death");

        //poll and handle inputs
        const moveDirection = this.getDirection(this.inputs.A.isDown, this.inputs.D.isDown, this.inputs.W.isDown, this.inputs.S.isDown);
        this.body.setVelocityX(moveDirection.x * this.configs.moveSpeed);
        this.body.setVelocityY(moveDirection.y * this.configs.moveSpeed);
        const fireDirection = this.getDirection(this.inputs.LEFT.isDown, this.inputs.RIGHT.isDown, this.inputs.UP.isDown, this.inputs.DOWN.isDown);
        if ((fireDirection.x != 0 || fireDirection.y != 0) && this.shootCooldown <= 0) {
            this.shootCooldown = this.configs.shootCooldown;
            const bullet = bulletGroup.get(this.x, this.y, "sprite_bullet");
            bullet.start(fireDirection.x, fireDirection.y);
        }
    }
}