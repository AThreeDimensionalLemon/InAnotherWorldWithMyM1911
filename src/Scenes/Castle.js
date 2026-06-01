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

        //create characters
        //TODO: Figure out how to use a constructor of a sprite with a dynamic body
        //TODO: Create enemy sprites
        this.player = new Player(this.physics.add.sprite(512, 640, "sprite_player"));

        //setup camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, true, 0.25, 0.25);
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}