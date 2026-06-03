class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene, enemyGroup) {

        //setup parent class
        super(scene.physics.world, scene, {
            key: "sprite_bullet",
            classType: Bullet,
            quantity: -1
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.addColliderWithMap(this, (bullet, wall) => {
            if (bullet.active) {
                this.killAndHide(bullet);
                bullet.body.stop();
            }
        });
        scene.physics.add.collider(this, enemyGroup, (bullet, enemy) => {
            if (bullet.active) {
                this.killAndHide(bullet);
                bullet.body.stop();
                enemyGroup.killAndHide(enemy);
            }
        });
    }
}