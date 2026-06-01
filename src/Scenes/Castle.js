class Castle extends Phaser.Scene {
    constructor() {
        super("Castle");
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
    }

    create() {

        //create map
        this.map.tilemap = this.add.tilemap("tilemapJson_Castle");
        this.map.tilemap.addTilesetImage("spritesheet_maps");
        for (const layer of this.map.tilemap.layers) {
            this.map.layers[layer.name] = this.map.tilemap.createLayer(layer.name, "spritesheet_maps");
            if (layer.name.includes("collidable")) this.map.layers[layer.name].setCollisionByProperty({ collides: true });
        }

        //create characters
        //TODO: Figure out how to use the constructor of a sprite with a dynamic body and move it into Player
        //TODO: Create enemy sprites
        this.player = new Player(this.physics.add.sprite(512, 640, "sprite_player"));

        //setup collisions
        for (const layer in this.map.layers) {
            // console.log(this.map.layers[layer]);
            console.log(this.physics.add.collider(this.player.sprite.body, this.map.layers[layer]));
        }

        //setup camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, true, 0.25, 0.25);
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}