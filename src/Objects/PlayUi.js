class PlayUi {
    constructor(scene) {

        //read configs
        //TODO: Make this object read from a JSON
        this.configs = {
            height: game.config.height / 16,
            colorTheme: "0x97E5E8"
        }

        this.camera = scene.cameras.main;
        this.header = scene.add.rectangle(game.config.width / 2, this.configs.height / 2, game.config.width, this.configs.height, this.configs.colorTheme);
        this.header.setScrollFactor(0);
        this.footer = scene.add.rectangle(game.config.width / 2, game.config.height - this.configs.height / 2, game.config.width, this.configs.height, this.configs.colorTheme);
        this.footer.setScrollFactor(0);
        this.healthBar = {
            filled: [
                scene.add.image(0, 0, "sprite_healthFull_1"),
                scene.add.image(0, 0, "sprite_healthFull_2"),
                scene.add.image(0, 0, "sprite_healthFull_3")
            ],
            emptied: [
                scene.add.image(0, 0, "sprite_healthEmpty_1"),
                scene.add.image(0, 0, "sprite_healthEmpty_2"),
                scene.add.image(0, 0, "sprite_healthEmpty_3")
            ]
        }
        console.log(this.healthBar);
        for (let healthBarType in this.healthBar) {
            for (let i = 0; i < this.healthBar[healthBarType].length; i++) {
                let image = this.healthBar[healthBarType][i];
                image.x = this.footer.x - (this.footer.width / 2 - (this.footer.height / 2 + 4)) + image.width * i;
                image.y = this.footer.y;
                image.setScrollFactor(0);
                image.setDepth(2);
            }
        }
    }
}