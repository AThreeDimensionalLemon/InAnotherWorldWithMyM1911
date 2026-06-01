class Castle extends Phaser.Scene {
    constructor() {
        super("Castle");
    }

    init() {
        this.collidables = [];
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
        for (let layer of this.map.layers) {
            layer = this.map.createLayer(layer.name, "spritesheet_maps");
            layer.forEachTile((tile) => {
                if (tile.properties.isCollidable == true) {
                    tile.getCustomPhysicsCenter = function() {
                        return { //getCenter methods return another function; manually calculate the center
                            x: this.pixelX + this.width / 2,
                            y: this.pixelY + this.height / 2
                        };
                    };
                    this.collidables.push(tile);
                }
            });
        }

        //create characters
        //TODO: Create enemy sprites
        this.player = new Player(this, 512, 640, "sprite_player");
        this.collidables.push(this.player);

        //cleanup physics
        this.collidables = mergeSort(this.collidables);

        //setup camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.collidables = mergeSort(this.collidables);
    }
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function getHypotenuse(a, b) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        const leftDistance = getHypotenuse(left[i].getCustomPhysicsCenter().x, left[i].getCustomPhysicsCenter().y);
        const rightDistance = getHypotenuse(right[j].getCustomPhysicsCenter().x, right[j].getCustomPhysicsCenter().y);
        if (leftDistance <= rightDistance) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}