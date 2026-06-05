class EnemyGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, player, inSpawns, pathfinderMap) {

        //setup parent class
        super(scene.physics.world, scene, {
            key: "sprite_enemy",
            classType: Enemy,
            quantity: -1
        });
        this.runChildUpdate = true;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, player, (player, enemy) => { //TODO: Figure out what determines which object is the first argument
            if (enemy.active && player.damageCooldown <= 0) {
                player.hurt();
            }
        });

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            difficultyInterval: 15000,
            spawnInterval: 2500
        }

        //gameplay variables
        this.spawns = inSpawns
        this.difficulty = 1;
        this.spawnCooldown = this.configs.spawnInterval;
    }

    update(time, delta) {

        //update variables
        this.difficulty = Math.ceil(time / this.configs.difficultyInterval);
        this.spawnCooldown -= delta;

        //spawning
        if (this.spawnCooldown <= 0) {
            for (let i = 0; i < this.difficulty; i++) {
                const targetSpawn = this.spawns[Math.floor(Math.random() * this.spawns.length)];
                const enemy = this.get(targetSpawn.x, targetSpawn.y, "sprite_enemy");
                enemy.start();
            }
            this.spawnCooldown = this.configs.spawnInterval;
        }
    }
}