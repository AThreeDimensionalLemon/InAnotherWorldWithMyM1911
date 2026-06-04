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

        //create player
        this.player = new Player(this, 512, 640);

        //create enemy group
        let enemySpawns = [];
        for (const layer in this.map.layers) {
            this.map.layers[layer].forEachTile((tile) => {
                if (tile.properties.spawns) enemySpawns.push({
                    x: tile.pixelX + tile.width / 2,
                    y: tile.pixelY + tile.height / 2
                });
            });
        }
        this.enemyGroup = new EnemyGroup(this, this.player, enemySpawns, this.map.tilemap);

        //create enemy spawning architecture
        this.pathfinderGrid = [];
        for (let x = 0; x < this.map.tilemap.height; x++) {
            this.pathfinderGrid.push([]);
            for (let y = 0; y < this.map.tilemap.width; y++) {
                this.pathfinderGrid[x].push(0);
            }
        }
        for (let y = 0; y < this.map.tilemap.height; y++) {
            for (let x = 0; x < this.map.tilemap.width; x++) {
                for (const layer of this.map.tilemap.layers) {
                    const tile = layer.tilemapLayer.getTileAt(x, y);
                    if (tile != null) this.pathfinderGrid[y][x] = tile.index - 1;
                }
            }
        }
        this.pathfinderFilter = [];
        this.pathfinderFilter.push(1228, 1229, 1230, 1285, 1286, 1287, 1342, 1343, 1344); //stone floor tiles
        this.pathfinderFilter.push(1235, 1236, 1237, 1292, 1293, 1294, 1349, 1350, 1351); //wood floor tiles
        this.pathfinderFilter.push(1055, 1056, 1062, 1063); //both types of spawn points
        this.pathfinderFilter.push(1611, 1612, 1613, 1668, 1669, 1670, 1725, 1726, 1727); //bordered carpet tiles
        this.pathfinderFilter.push(1643, 1644, 1645, 1700, 1701, 1702, 1757, 1758, 1759); //smaller carpet tiles
        this.pathfinderFilter.push(882, 883, 885, 940, 942, 999, 1006); //stair tiles
        this.pathfinderFilter.push(711, 712, 718, 719, 720, 768, 772, 777, 781, 832); //secret hallway tiles
        this.pathfinderFilter.push(1110, 1167); //pillars

        //create bullet group
        this.bulletGroup = new BulletGroup(this, this.enemyGroup);

        //debugging
        this.tempEnemy = this.enemyGroup.get(512, 600, "sprite_enemy");

        //setup camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
    }

    update(time, delta) {
        this.enemyGroup.update(time);
        this.player.update(delta, this.bulletGroup);
    }
}