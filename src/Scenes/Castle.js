class Castle extends Phaser.Scene {
    constructor() {
        super("Castle");
    }

    addColliderWithMap(object, callback) {
        for (const layer in this.map.layers) {
            if (layer.includes("collidable")) this.physics.add.collider(object, this.map.layers[layer], callback);
        }
    }

    init() {
        this.map = {
            tilemap: null,
            layers: {
                collidable1: null,
                collidable2: null,
                decoration1: null,
                decoration2: null
            }
        }
    }

    preload() {

        //queue to-be-loaded map assets
        this.load.setPath("./assets/Maps/");
        this.load.image("spritesheet_maps");
        this.load.tilemapTiledJSON("tilemapJson_Castle", "Castle.json");

        //queue to-be-loaded character assets
        this.load.setPath("./assets/Characters/");
        this.load.image("sprite_enemy");
        this.load.image("sprite_player");
        this.load.image("sprite_bullet");
    }

    create() {

        //create map
        this.map.tilemap = this.add.tilemap("tilemapJson_Castle");
        this.map.tilemap.addTilesetImage("spritesheet_maps");
        for (const layer of this.map.tilemap.layers) {
            this.map.layers[layer.name] = this.map.tilemap.createLayer(layer.name, "spritesheet_maps");
            if (layer.name.includes("collidable")) this.map.layers[layer.name].setCollisionByProperty({ collides: true });
        }

        //create moving elements
        this.player = new Player(this, 512, 640);
        this.enemyGroup = new EnemyGroup(this, this.player);
        this.bulletGroup = new BulletGroup(this, this.enemyGroup);
        this.tempEnemy = this.enemyGroup.get(512, 600, "sprite_enemy");
        console.log(this.enemyGroup, this.bulletGroup);

        //setup collisions
        this.addColliderWithMap(this.player);

        //setup camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
    }

    update(time, delta) {
        this.enemyGroup.update(time);
        this.player.update(delta, this.bulletGroup);
    }
}