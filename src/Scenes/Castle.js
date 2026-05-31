class Castle extends Phaser.Scene {
    constructor() {
        super("Castle");
    }

    init() {

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
        this.map = this.add.tilemap("tilemapJson_Castle");
        this.map.addTilesetImage("spritesheet_maps");
        for (const layer of this.map.layers) {
            this.map.createLayer(layer.name, "spritesheet_maps")
        }
    }

    update() {

    }
}