class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {

        //setup parent class
        super(scene, x, y, texture);
        scene.add.existing(this);

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            moveSpeed: 75
        }

        //setup pathfinding
        this.pathfinder = new EasyStar.js();
        this.tileSize = scene.map.tilemap.tileWidth; //assumes tiles are square
        this.pathfinder.setGrid(scene.pathfinderGrid);
        this.pathfinder.setAcceptableTiles(scene.pathfinderFilter);
        this.pathfinder.setIterationsPerCalculation(1000);

        //gameplay variables
        this.isTweening = false;
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

    update(time, delta) {
        if (this.active && !this.isTweening) {
            const enemyX = Math.floor(this.x / this.tileSize);
            const enemyY = Math.floor(this.y / this.tileSize);
            const playerX = Math.floor(this.scene.player.x / this.tileSize);
            const playerY = Math.floor(this.scene.player.y / this.tileSize);
            this.pathfinder.findPath(enemyX, enemyY, playerX, playerY, (path) => {
                if (path == null || path.length < 1) return;
                this.isTweening = true;
                this.scene.tweens.add({
                    targets: [ this ],
                    x: path[1].x * this.tileSize + this.tileSize / 2,
                    y: path[1].y * this.tileSize + this.tileSize / 2,
                    duration: (this.tileSize / this.configs.moveSpeed) * 1000,
                    onUpdate: () => {
                        this.body.x = this.x - this.width / 2;
                        this.body.y = this.y - this.height / 2;
                    },
                    onComplete: () => {
                        this.isTweening = false;
                    }
                });
            });
            this.pathfinder.calculate();
        }
    }
}