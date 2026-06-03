class EnemyGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, player, inSpawns, pathfinderMap) {

        //setup parent class
        super(scene.physics.world, scene, {
            key: "sprite_enemy",
            classType: Enemy,
            quantity: -1
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, player, (player, enemy) => { //TODO: Figure out what determines which object is the first argument
            if (enemy.active) {
                console.log("enemy attacked the player");
            }
        });

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            difficultyInterval: 30000
        }

        //architecture
        this.pathfinder = new EasyStar.js();
        let pathfinderGrid = [];
        for (let x = 0; x < pathfinderMap.height; x++) {
            pathfinderGrid.push([]);
            for (let y = 0; y < pathfinderMap.width; y++) {
                pathfinderGrid[x].push(0);
            }
        }
        for (let y = 0; y < pathfinderMap.height; y++) {
            for (let x = 0; x < pathfinderMap.width; x++) {
                for (const layer of pathfinderMap.layers) {
                    const tile = layer.tilemapLayer.getTileAt(x, y);
                    if (tile != null) pathfinderGrid[y][x] = tile.index - 1;
                }
            }
        }
        this.pathfinder.setGrid(pathfinderGrid);
        let pathfinderWalkables = [];
        pathfinderWalkables.push(1228, 1229, 1230, 1285, 1286, 1287, 1342, 1343, 1344); //stone floor tiles
        pathfinderWalkables.push(1235, 1236, 1237, 1292, 1293, 1294, 1349, 1350, 1351); //wood floor tiles
        pathfinderWalkables.push(1055, 1056, 1062, 1063); //both types of spawn points
        pathfinderWalkables.push(1611, 1612, 1613, 1668, 1669, 1670, 1725, 1726, 1727); //bordered carpet tiles
        pathfinderWalkables.push(1643, 1644, 1645, 1700, 1701, 1702, 1757, 1758, 1759); //smaller carpet tiles
        console.log(pathfinderWalkables);
        this.pathfinder.setAcceptableTiles(pathfinderWalkables);

        //gameplay variables
        this.spawns = inSpawns
        this.difficulty = 1;
    }

    update(time, delta) {

        //update variables
        this.difficulty = Math.ceil(time / this.configs.difficultyInterval)

        //spawning
    }
}